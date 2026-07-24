import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import Alert from '../../components/common/Alert';
import PageHeader from '../../components/common/PageHeader';
import PaymentModal from '../../components/payment/PaymentModal';
import { getBookings } from '../../services/bookingService';

export default function Payment() {
  const [message, setMessage] = useState('');
  const [booking, setBooking] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [searchParams] = useSearchParams();
  useEffect(() => { getBookings().then(({ data }) => { const bookings = data.results || data; const requestedId = searchParams.get('booking'); setBooking(bookings.find((item) => item.id === requestedId && item.payment_status === 'UNPAID') || bookings.find((item) => item.payment_status === 'UNPAID') || null); }).catch(() => setMessage('Unable to load a booking for payment.')); }, [searchParams]);
  const handleSuccess = () => { setIsPaymentOpen(false); setMessage('Your payment request has been submitted and is awaiting verification.'); setBooking(null); };

  return (
    <section className="section page">
      <PageHeader eyebrow="Payment" title="Complete your payment" text="Choose a secure demo payment method for your pending booking." />
      <div className="form-layout">
        <div className="panel flex flex-col gap-4">
          {message && <Alert>{message}</Alert>}
          <h3>Ready to complete your booking?</h3>
          <p className="muted">Select Pay Now to choose QR payment or request cash-payment verification. Your booking remains secure while we review your proof.</p>
          <Button onClick={() => setIsPaymentOpen(true)} disabled={!booking}>Pay Now</Button>
        </div>
        <aside className="summary-card flex flex-col gap-2">
          <h3>Payment Summary</h3>
          {booking ? <><p>{booking.id}</p><p>{booking.court_name}</p><p>{booking.date} · {booking.time}</p><strong>NPR {Number(booking.amount).toLocaleString()}</strong></> : <p>No unpaid booking is available.</p>}
        </aside>
      </div>
      {isPaymentOpen && booking && <PaymentModal booking={booking} onClose={() => setIsPaymentOpen(false)} onSuccess={handleSuccess} />}
    </section>
  );
}

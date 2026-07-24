import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import PaymentCard from '../../components/cards/PaymentCard';
import Alert from '../../components/common/Alert';
import PageHeader from '../../components/common/PageHeader';
import { getBookings } from '../../services/bookingService';
import { createPayment } from '../../services/paymentService';

export default function Payment() {
  const [method, setMethod] = useState('eSewa');
  const [message, setMessage] = useState('');
  const [booking, setBooking] = useState(null);
  const [searchParams] = useSearchParams();
  useEffect(() => { getBookings().then(({ data }) => { const bookings = data.results || data; const requestedId = searchParams.get('booking'); setBooking(bookings.find((item) => item.id === requestedId && item.payment_status === 'UNPAID') || bookings.find((item) => item.payment_status === 'UNPAID') || null); }).catch(() => setMessage('Unable to load a booking for payment.')); }, [searchParams]);
  const pay = async () => { if (!booking) return; try { await createPayment({ booking_id: booking.id, method: method.toUpperCase() }); setMessage('Payment successful. Your booking is confirmed.'); setBooking(null); } catch (error) { setMessage(error.response?.data?.booking_id?.[0] || 'Payment could not be completed.'); } };

  return (
    <section className="section page">
      <PageHeader eyebrow="Payment" title="Complete your payment" text="Choose a secure demo payment method for your pending booking." />
      <div className="form-layout">
        <div className="panel">
          {message && <Alert>{message}</Alert>}
          <h3>Payment Method</h3>
          <div className="payment-grid">{['FonePay', 'Cash'].map((item) => <PaymentCard key={item} method={item} active={method === item} onClick={() => setMethod(item)} />)}</div>
          <Button onClick={pay} disabled={!booking}>Pay Now</Button>
        </div>
        <aside className="summary-card flex flex-col gap-2">
          <h3>Payment Summary</h3>
          {booking ? <><p>{booking.id}</p><p>{booking.court_name}</p><p>{booking.date} · {booking.time}</p><strong>NPR {Number(booking.amount).toLocaleString()}</strong></> : <p>No unpaid booking is available.</p>}
          <span> Selected: {method}</span>
        </aside>
      </div>
    </section>
  );
}

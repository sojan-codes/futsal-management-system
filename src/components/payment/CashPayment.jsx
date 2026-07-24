import { useState } from 'react';
import { CalendarDays, Clock3, MapPin, WalletCards } from 'lucide-react';
import { toast } from 'react-toastify';
import LoadingOverlay from './LoadingOverlay';
import SuccessDialog from './SuccessDialog';
import { createPayment } from '../../services/paymentService';

export default function CashPayment({ booking, onCancel, onSuccess }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const amount = Number(booking.amount || booking.total_amount || 0).toLocaleString();

  const confirm = async () => {
    setBusy(true);
    try {
      await createPayment({ booking_id: booking.id, method: 'CASH' });
      toast.success('Cash payment booking submitted successfully.');
      setDone(true);
    } catch (error) {
      toast.error(error.response?.data?.booking_id?.[0] || error.response?.data?.detail || 'We could not submit your cash payment booking. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (done) return <SuccessDialog title="Cash payment submitted" description="Your booking is awaiting cash payment verification from the futsal venue." onClose={onSuccess} />;

  return <section className="payment-flow cash-flow">
    <button className="payment-back" type="button" onClick={onCancel} disabled={busy}>← Back to payment methods</button>
    <div className="payment-flow-heading">
      <span className="flow-icon"><WalletCards size={22} /></span>
      <div><h2>Cash Payment</h2><p>Complete your payment in cash and submit your booking for confirmation.</p></div>
    </div>
    <article className="cash-instruction-card">
      <WalletCards size={21} />
      <div><strong>Pay at the venue</strong><p>Please pay the booking amount in cash at the futsal venue. Once you submit this booking, our team will verify the payment and confirm your slot.</p></div>
    </article>
    <div className="cash-booking-summary">
      <div className="cash-amount"><span>Booking amount</span><strong>NPR {amount}</strong></div>
      <div className="cash-summary-row"><MapPin size={17} /><span>Court</span><strong>{booking.court_name || booking.court?.name || 'Selected court'}</strong></div>
      <div className="cash-summary-row"><CalendarDays size={17} /><span>Date</span><strong>{booking.date || booking.booking_date}</strong></div>
      <div className="cash-summary-row"><Clock3 size={17} /><span>Time</span><strong>{booking.time || booking.start_time}</strong></div>
    </div>
    <div className="payment-actions"><button className="btn btn-ghost" type="button" onClick={onCancel} disabled={busy}>Back</button><button className="btn btn-primary" type="button" onClick={confirm} disabled={busy}>Confirm Cash Payment</button></div>
    {busy && <LoadingOverlay message="Submitting your booking..." />}
  </section>;
}

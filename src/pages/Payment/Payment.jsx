import { useState } from 'react';
import Button from '../../components/buttons/Button';
import PaymentCard from '../../components/cards/PaymentCard';
import Alert from '../../components/common/Alert';
import PageHeader from '../../components/common/PageHeader';
import bookings from '../../data/bookings.json';

export default function Payment() {
  const [method, setMethod] = useState('eSewa');
  const [paid, setPaid] = useState(false);
  const booking = bookings[0];

  return (
    <section className="section page">
      <PageHeader eyebrow="Payment" title="Complete your payment" text="UI-only payment selection for future gateway integration." />
      <div className="form-layout">
        <div className="panel">
          {paid && <Alert>Mock payment successful. No real transaction was made.</Alert>}
          <h3>Payment Method</h3>
          <div className="payment-grid">{['eSewa', 'Khalti', 'Cash', 'Card'].map((item) => <PaymentCard key={item} method={item} active={method === item} onClick={() => setMethod(item)} />)}</div>
          <Button onClick={() => setPaid(true)}>Pay Now</Button>
        </div>
        <aside className="summary-card">
          <h3>Payment Summary</h3>
          <p>{booking.id}</p>
          <p>{booking.court}</p>
          <p>{booking.date} · {booking.time}</p>
          <strong>NPR {booking.amount.toLocaleString()}</strong>
          <span>Selected: {method}</span>
        </aside>
      </div>
    </section>
  );
}

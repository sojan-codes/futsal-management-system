import { FiCreditCard } from 'react-icons/fi';

export default function PaymentCard({ method, active, onClick }) {
  return (
    <button className={`payment-card ${active ? 'active' : ''}`} type="button" onClick={onClick}>
      <FiCreditCard />
      <span>{method}</span>
    </button>
  );
}

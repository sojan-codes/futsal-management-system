import Badge from '../common/Badge';

export default function BookingCard({ booking }) {
  const tone = booking.status === 'Completed' ? 'green' : booking.status === 'Cancelled' ? 'red' : 'yellow';
  return (
    <article className="booking-card">
      <div>
        <span>{booking.id}</span>
        <h3>{booking.court}</h3>
        <p>{booking.date} at {booking.time} · {booking.duration} hour</p>
      </div>
      <div>
        <Badge tone={tone}>{booking.status}</Badge>
        <strong>NPR {booking.amount.toLocaleString()}</strong>
      </div>
    </article>
  );
}

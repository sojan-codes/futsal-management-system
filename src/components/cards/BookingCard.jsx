import Badge from '../common/Badge';

export default function BookingCard({ booking }) {
  const tone = booking.status === 'COMPLETED' ? 'green' : booking.status === 'CANCELLED' ? 'red' : 'yellow';
  return (
    <article className="booking-card">
      <div>
        <span>{booking.id}</span>
        <h3>{booking.court_name || booking.court}</h3>
        <p>{booking.date} at {booking.time} · {booking.duration} hour</p>
      </div>
      <div>
        <Badge tone={tone}>{booking.status}</Badge>
        <strong>NPR {Number(booking.amount).toLocaleString()}</strong>
      </div>
    </article>
  );
}

import BookingCard from '../../components/cards/BookingCard';
import PageHeader from '../../components/common/PageHeader';
import bookings from '../../data/bookings.json';

export default function Bookings() {
  return (
    <section className="section page">
      <PageHeader eyebrow="Bookings" title="Your booking overview" text="A quick player-facing list of recent and upcoming futsal reservations." />
      <div className="booking-list">{bookings.map((booking) => <BookingCard booking={booking} key={booking.id} />)}</div>
    </section>
  );
}

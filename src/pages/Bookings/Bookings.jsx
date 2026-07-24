import BookingCard from '../../components/cards/BookingCard';
import PageHeader from '../../components/common/PageHeader';
import { useEffect, useState } from 'react';
import { getBookings } from '../../services/bookingService';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => { getBookings().then(({ data }) => setBookings(data.results || data)); }, []);
  return (
    <section className="section page">
      <PageHeader eyebrow="Bookings" title="Your booking overview" text="A quick player-facing list of recent and upcoming futsal reservations." />
      <div className="booking-list">{bookings.map((booking) => <BookingCard booking={booking} key={booking.id} />)}</div>
    </section>
  );
}

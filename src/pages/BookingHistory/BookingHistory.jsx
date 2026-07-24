import Badge from '../../components/common/Badge';
import PageHeader from '../../components/common/PageHeader';
import { useEffect, useState } from 'react';
import { cancelBooking, getBookings } from '../../services/bookingService';

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const load = () => getBookings().then(({ data }) => setBookings(data.results || data));
  useEffect(load, []);
  return (
    <section className="section page">
      <PageHeader eyebrow="History" title="Booking history" text="Mock tabular data for backend-ready booking records." />
      <div className="table-wrap">
        <table><thead><tr><th>Booking ID</th><th>Court</th><th>Date</th><th>Time</th><th>Status</th><th>Payment</th><th>Action</th></tr></thead>
          <tbody>{bookings.map((booking) => <tr key={booking.id}><td>{booking.id}</td><td>{booking.court_name}</td><td>{booking.date}</td><td>{booking.time}</td><td><Badge tone={booking.status === 'CANCELLED' ? 'red' : 'green'}>{booking.status}</Badge></td><td>{booking.payment}</td><td><button className="text-btn" disabled={['CANCELLED','COMPLETED'].includes(booking.status)} onClick={() => cancelBooking(booking.id).then(load)}>Cancel</button></td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

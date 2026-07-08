import Badge from '../../components/common/Badge';
import PageHeader from '../../components/common/PageHeader';
import bookings from '../../data/bookings.json';

export default function BookingHistory() {
  return (
    <section className="section page">
      <PageHeader eyebrow="History" title="Booking history" text="Mock tabular data for backend-ready booking records." />
      <div className="table-wrap">
        <table><thead><tr><th>Booking ID</th><th>Court</th><th>Date</th><th>Time</th><th>Status</th><th>Payment</th><th>Action</th></tr></thead>
          <tbody>{bookings.map((booking) => <tr key={booking.id}><td>{booking.id}</td><td>{booking.court}</td><td>{booking.date}</td><td>{booking.time}</td><td><Badge tone={booking.status === 'Cancelled' ? 'red' : 'green'}>{booking.status}</Badge></td><td>{booking.payment}</td><td><button className="text-btn">Cancel</button></td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

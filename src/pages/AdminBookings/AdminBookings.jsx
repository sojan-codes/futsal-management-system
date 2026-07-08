import AdminLayout from '../../components/layout/AdminLayout';
import Badge from '../../components/common/Badge';
import bookings from '../../data/bookings.json';

export default function AdminBookings() {
  return (
    <AdminLayout title="Bookings">
      <div className="table-wrap"><table><thead><tr><th>ID</th><th>Court</th><th>Date</th><th>Time</th><th>Status</th><th>Payment</th><th>Actions</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id}><td>{booking.id}</td><td>{booking.court}</td><td>{booking.date}</td><td>{booking.time}</td><td><Badge>{booking.status}</Badge></td><td>{booking.payment}</td><td><button className="text-btn">Approve</button><button className="text-btn">Reject</button><button className="text-btn danger">Cancel</button></td></tr>)}</tbody></table></div>
    </AdminLayout>
  );
}

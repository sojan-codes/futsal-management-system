import AdminLayout from '../../components/layout/AdminLayout';
import Badge from '../../components/common/Badge';
import { useEffect, useState } from 'react';
import { cancelBooking, getBookings } from '../../services/bookingService';
import Alert from '../../components/common/Alert';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const load = async () => { setLoading(true); setError(''); try { const { data } = await getBookings(); setBookings(Array.isArray(data) ? data : data.results || []); } catch (err) { setError(err.response?.data?.detail || 'Unable to load booking data.'); } finally { setLoading(false); } }; useEffect(() => { load(); }, []);
  return (
    <AdminLayout title="Bookings">
      {error && <Alert>{error}</Alert>}
      {loading ? <div className="panel">Loading bookings…</div> : <div className="table-wrap"><table><thead><tr><th>ID</th><th>Court</th><th>Date</th><th>Time</th><th>Status</th><th>Payment</th><th>Actions</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id}><td>{booking.id}</td><td>{booking.court_name || 'Court unavailable'}</td><td>{booking.date}</td><td>{booking.time}</td><td><Badge>{booking.status}</Badge></td><td>{booking.payment}</td><td><button className="text-btn danger" disabled={['CANCELLED', 'COMPLETED'].includes(booking.status)} onClick={() => cancelBooking(booking.id).then(load).catch(() => setError('Unable to cancel this booking.'))}>Cancel</button></td></tr>)}</tbody></table></div>}
    </AdminLayout>
  );
}

import { FiCalendar, FiDollarSign, FiGrid, FiUsers } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import StatCard from '../../components/cards/StatCard';
import Badge from '../../components/common/Badge';
import { getBookings } from '../../services/bookingService';
import apiClient from '../../services/apiClient';

export default function AdminDashboard() {
  const [summary, setSummary] = useState({ users: 0, courts: 0, bookings: 0, revenue: 0 });
  const [bookings, setBookings] = useState([]); const [revenue, setRevenue] = useState([]);
  useEffect(() => { apiClient.get('/reports/summary').then(({ data }) => setSummary(data)); apiClient.get('/reports/monthly-revenue').then(({ data }) => setRevenue(data)); getBookings().then(({ data }) => setBookings((data.results || data).slice(0, 5))); }, []);
  return (
    <AdminLayout title="Dashboard Overview">
      <div className="stats-grid">
        <StatCard icon={<FiUsers />} label="Users" value={summary.users.toLocaleString()} />
        <StatCard icon={<FiGrid />} label="Courts" value={summary.courts} />
        <StatCard icon={<FiCalendar />} label="Bookings" value={summary.bookings} />
        <StatCard icon={<FiDollarSign />} label="Revenue" value={`NPR ${Number(summary.revenue).toLocaleString()}`} />
      </div>
      <div className="dashboard-grid mt-8">
        <div className="panel"><h3>Monthly Revenue</h3><div className="bar-chart">{revenue.map((item) => <span key={item.month} style={{ height: `${Number(item.revenue) / 5000}px` }} />)}</div></div>
        <div className="panel"><h3>Recent Bookings</h3><div className="table-wrap mt-5"><table><tbody >{bookings.map((booking) => <tr key={booking.id}><td>{booking.id}</td><td>{booking.court_name}</td><td><Badge>{booking.status}</Badge></td></tr>)}</tbody></table></div></div>
      </div>
    </AdminLayout>
  );
}

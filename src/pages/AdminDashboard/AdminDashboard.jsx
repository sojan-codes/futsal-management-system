import { FiCalendar, FiDollarSign, FiGrid, FiUsers } from 'react-icons/fi';
import AdminLayout from '../../components/layout/AdminLayout';
import StatCard from '../../components/cards/StatCard';
import Badge from '../../components/common/Badge';
import bookings from '../../data/bookings.json';
import reports from '../../data/reports.json';

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard Overview">
      <div className="stats-grid">
        <StatCard icon={<FiUsers />} label="Users" value={reports.summary.users.toLocaleString()} />
        <StatCard icon={<FiGrid />} label="Courts" value={reports.summary.courts} />
        <StatCard icon={<FiCalendar />} label="Bookings" value={reports.summary.bookings} />
        <StatCard icon={<FiDollarSign />} label="Revenue" value={`NPR ${reports.summary.revenue.toLocaleString()}`} />
      </div>
      <div className="dashboard-grid">
        <div className="panel"><h3>Monthly Revenue</h3><div className="bar-chart">{reports.monthlyRevenue.map((value) => <span key={value} style={{ height: `${value / 5000}px` }} />)}</div></div>
        <div className="panel"><h3>Recent Bookings</h3><div className="table-wrap"><table><tbody>{bookings.map((booking) => <tr key={booking.id}><td>{booking.id}</td><td>{booking.court}</td><td><Badge>{booking.status}</Badge></td></tr>)}</tbody></table></div></div>
      </div>
    </AdminLayout>
  );
}

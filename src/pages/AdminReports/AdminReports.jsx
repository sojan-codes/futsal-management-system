import { FiBarChart2, FiCalendar, FiDollarSign, FiGrid } from 'react-icons/fi';
import AdminLayout from '../../components/layout/AdminLayout';
import StatCard from '../../components/cards/StatCard';
import reports from '../../data/reports.json';

export default function AdminReports() {
  return (
    <AdminLayout title="Reports">
      <div className="stats-grid">
        <StatCard icon={<FiDollarSign />} label="Revenue" value={`NPR ${reports.summary.revenue.toLocaleString()}`} />
        <StatCard icon={<FiCalendar />} label="Bookings" value={reports.summary.bookings} />
        <StatCard icon={<FiGrid />} label="Popular Courts" value={reports.popularCourts.length} />
        <StatCard icon={<FiBarChart2 />} label="Conversion" value="68%" />
      </div>
      <div className="dashboard-grid">
        <div className="panel"><h3>Monthly Chart</h3><div className="bar-chart">{reports.monthlyRevenue.map((value) => <span key={value} style={{ height: `${value / 5000}px` }} />)}</div></div>
        <div className="panel"><h3>Payment Pie Chart</h3><div className="donut-chart"><span>100%</span></div><div className="chip-list">{reports.paymentSplit.map((item) => <span key={item.method}>{item.method}: {item.value}%</span>)}</div></div>
        <div className="panel"><h3>Popular Courts</h3>{reports.popularCourts.map((court) => <div className="report-row" key={court.name}><span>{court.name}</span><strong>{court.bookings}</strong></div>)}</div>
      </div>
    </AdminLayout>
  );
}

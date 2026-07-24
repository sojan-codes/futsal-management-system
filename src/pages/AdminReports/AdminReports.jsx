import { FiBarChart2, FiCalendar, FiDollarSign, FiGrid } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import StatCard from '../../components/cards/StatCard';
import apiClient from '../../services/apiClient';

export default function AdminReports() {
  const [summary, setSummary] = useState({ revenue: 0, bookings: 0 });
  const [monthlyRevenue, setMonthlyRevenue] = useState([]); const [popularCourts, setPopularCourts] = useState([]); const [paymentSplit, setPaymentSplit] = useState([]);
  useEffect(() => { apiClient.get('/reports/summary').then(({ data }) => setSummary(data)); apiClient.get('/reports/monthly-revenue').then(({ data }) => setMonthlyRevenue(data)); apiClient.get('/reports/popular-courts').then(({ data }) => setPopularCourts(data)); apiClient.get('/reports/payment-split').then(({ data }) => setPaymentSplit(data)); }, []);
  return (
    <AdminLayout title="Reports">
      <div className="stats-grid">
        <StatCard icon={<FiDollarSign />} label="Revenue" value={`NPR ${Number(summary.revenue).toLocaleString()}`} />
        <StatCard icon={<FiCalendar />} label="Bookings" value={summary.bookings} />
        <StatCard icon={<FiGrid />} label="Popular Courts" value={popularCourts.length} />
        <StatCard icon={<FiBarChart2 />} label="Payment Methods" value={paymentSplit.length} />
      </div>
      <div className="dashboard-grid mt-9">
        <div className="panel"><h3>Monthly Chart</h3><div className="bar-chart">{monthlyRevenue.map((item) => <span key={item.month} style={{ height: `${Number(item.revenue) / 5000}px` }} />)}</div></div>
        <div className="panel"><h3>Payment Split</h3><div className="donut-chart"><span>{paymentSplit.length}</span></div><div className="chip-list">{paymentSplit.map((item) => <span key={item.payment_method}>{item.payment_method}: NPR {Number(item.amount).toLocaleString()}</span>)}</div></div>
        <div className="panel"><h3>Popular Courts</h3>{popularCourts.map((court) => <div className="report-row" key={court.name}><span>{court.name}</span><strong>{court.bookings_count}</strong></div>)}</div>
      </div>
    </AdminLayout>
  );
}

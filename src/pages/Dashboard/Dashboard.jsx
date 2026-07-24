import { FiCalendar, FiCheckCircle, FiCreditCard, FiXCircle } from 'react-icons/fi';
import { useEffect, useMemo, useState } from 'react';
import Button from '../../components/buttons/Button';
import BookingCard from '../../components/cards/BookingCard';
import StatCard from '../../components/cards/StatCard';
import PageHeader from '../../components/common/PageHeader';
import { getBookings } from '../../services/bookingService';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => { getBookings().then(({ data }) => setBookings(data.results || data)); }, []);
  const counts = useMemo(() => ({ upcoming: bookings.filter((b) => ['PENDING', 'CONFIRMED'].includes(b.status)).length, completed: bookings.filter((b) => b.status === 'COMPLETED').length, cancelled: bookings.filter((b) => b.status === 'CANCELLED').length, paid: bookings.filter((b) => b.payment_status === 'PAID').reduce((sum, b) => sum + Number(b.amount), 0) }), [bookings]);
  return (
    <section className="section page">
      <PageHeader eyebrow="Dashboard" title="Player control center" text="Track upcoming matches, booking status, and payment activity." />
      <div className="stats-grid">
        <StatCard icon={<FiCalendar />} label="Upcoming Bookings" value={counts.upcoming} />
        <StatCard icon={<FiCheckCircle />} label="Completed" value={counts.completed} />
        <StatCard icon={<FiXCircle />} label="Cancelled" value={counts.cancelled} />
        <StatCard icon={<FiCreditCard />} label="Payments" value={`NPR ${counts.paid.toLocaleString()}`} />
      </div>
      <div className="dashboard-grid mt-15">
        <div className="panel">
          <h3>Recent Bookings</h3>
          <div className="booking-list mt-8">{bookings.slice(0, 3).map((booking) => <BookingCard booking={booking} key={booking.id} />)}</div>
        </div>
        <div className="panel ">
          <h3>Quick Actions</h3>
          <div className="action-stack mt-5">
            <Button to="/courts">Book Court</Button>
            <Button to="/booking-history" variant="secondary">View History</Button>
            <Button to="/profile" variant="ghost">Profile</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

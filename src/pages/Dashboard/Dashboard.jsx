import { FiCalendar, FiCheckCircle, FiCreditCard, FiXCircle } from 'react-icons/fi';
import Button from '../../components/buttons/Button';
import BookingCard from '../../components/cards/BookingCard';
import StatCard from '../../components/cards/StatCard';
import PageHeader from '../../components/common/PageHeader';
import bookings from '../../data/bookings.json';

export default function Dashboard() {
  return (
    <section className="section page">
      <PageHeader eyebrow="Dashboard" title="Player control center" text="Track upcoming matches, booking status, and payment activity." />
      <div className="stats-grid">
        <StatCard icon={<FiCalendar />} label="Upcoming Bookings" value="2" />
        <StatCard icon={<FiCheckCircle />} label="Completed" value="18" />
        <StatCard icon={<FiXCircle />} label="Cancelled" value="1" />
        <StatCard icon={<FiCreditCard />} label="Payments" value="NPR 28k" />
      </div>
      <div className="dashboard-grid">
        <div className="panel">
          <h3>Recent Bookings</h3>
          <div className="booking-list">{bookings.slice(0, 3).map((booking) => <BookingCard booking={booking} key={booking.id} />)}</div>
        </div>
        <div className="panel">
          <h3>Quick Actions</h3>
          <div className="action-stack">
            <Button to="/courts">Book Court</Button>
            <Button to="/booking-history" variant="secondary">View History</Button>
            <Button to="/profile" variant="ghost">Profile</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { NavLink } from 'react-router-dom';
import { FiBarChart2, FiCalendar, FiGrid, FiHome, FiLogOut, FiUsers } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout({ title, children }) {
  const { logout } = useAuth();
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <NavLink className="logo" to="/"><FiGrid /> FutsalPro</NavLink>
        <NavLink to="/admin"><FiHome /> Dashboard</NavLink>
        <NavLink to="/admin/users"><FiUsers /> Users</NavLink>
        <NavLink to="/admin/courts"><FiGrid /> Courts</NavLink>
        <NavLink to="/admin/bookings"><FiCalendar /> Bookings</NavLink>
        <NavLink to="/admin/reports"><FiBarChart2 /> Reports</NavLink>
        <button type="button" onClick={logout}><FiLogOut /> Logout</button>
      </aside>
      <section className="admin-content">
        <div className="admin-topbar">
          <div>
            <span>Admin Console</span>
            <h1>{title}</h1>
          </div>
        </div>
        {children}
      </section>
    </div>
  );
}

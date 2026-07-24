import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Courts from './pages/Courts/Courts';
import CourtDetails from './pages/CourtDetails/CourtDetails';
import Booking from './pages/Booking/Booking';
import Bookings from './pages/Bookings/Bookings';
import BookingHistory from './pages/BookingHistory/BookingHistory';
import Payment from './pages/Payment/Payment';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import AdminUsers from './pages/AdminUsers/AdminUsers';
import AdminCourts from './pages/AdminCourts/AdminCourts';
import AdminBookings from './pages/AdminBookings/AdminBookings';
import AdminReports from './pages/AdminReports/AdminReports';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import NotFound from './pages/NotFound/NotFound';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !user.is_admin_console) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app-shell">
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courts" element={<Courts />} />
          <Route path="/courts/:id" element={<CourtDetails />} />
          <Route path="/booking/:courtId?" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/booking-history" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/courts" element={<ProtectedRoute adminOnly><AdminCourts /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute adminOnly><AdminBookings /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute adminOnly><AdminReports /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

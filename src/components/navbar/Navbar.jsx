import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiZap } from 'react-icons/fi';
import Button from '../buttons/Button';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  const close = () => setOpen(false);
  const handleLogout = () => {
    logout();
    close();
    navigate('/');
  };

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <NavLink className="logo" to="/" onClick={close}><FiZap /> FutsalPro</NavLink>
      <button className="nav-toggle" type="button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <FiX /> : <FiMenu />}
      </button>
      <nav className={open ? 'open' : ''}>
        <NavLink to="/" onClick={close}>Home</NavLink>
        <NavLink to="/courts" onClick={close}>Courts</NavLink>
        <NavLink to="/bookings" onClick={close}>Bookings</NavLink>
        <NavLink to="/about" onClick={close}>About</NavLink>
        <a href="#contact" onClick={close}>Contact</a>
        {user ? (
          <>
            <NavLink to={user.is_admin_console ? '/admin' : '/dashboard'} onClick={close}>Dashboard</NavLink>
            <NavLink to="/profile" onClick={close}>Profile</NavLink>
            <Button variant="ghost" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={close}>Login</NavLink>
            <Button to="/signup" onClick={close}>Sign Up</Button>
          </>
        )}
      </nav>
    </header>
  );
}

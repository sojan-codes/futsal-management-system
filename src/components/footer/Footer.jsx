import { FiArrowUp, FiFacebook, FiInstagram, FiMail, FiMapPin, FiPhone, FiTwitter, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../buttons/Button';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-grid">
        <div>
          <Link className="logo" to="/"><FiZap /> FutsalPro</Link>
          <p>Premium futsal bookings, modern court operations, and delightful player experiences.</p>
          <div className="socials"><FiFacebook /><FiInstagram /><FiTwitter /></div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link to="/courts">Courts</Link>
          <Link to="/booking-history">Booking History</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <h4>Support</h4>
          <Link to="/profile">Account</Link>
          <Link to="/payment">Payments</Link>
          <Link to="/booking-history">Cancellations</Link>
          <Link to="/forgot-password">Password Help</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <p><FiMapPin /> Kathmandu, Nepal</p>
          <p><FiPhone /> +977 9800000000</p>
          <p><FiMail /> hello@futsalpro.test</p>
        </div>
        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Weekly slots, league drops, and venue updates.</p>
          <form>
            <input type="email" placeholder="Email address" aria-label="Email address" />
            <Button type="submit" variant="secondary">Join</Button>
          </form>
        </div>
      </div>
      <div className="copyright">
        <span>Copyright 2026 FutsalPro. All rights reserved.</span>
        <a className="back-top" href="#top" aria-label="Back to top"><FiArrowUp /></a>
      </div>
    </footer>
  );
}

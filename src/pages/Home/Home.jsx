import { motion } from 'framer-motion';
import { FiArrowDown, FiArrowRight, FiCalendar, FiCheckCircle, FiShield, FiStar, FiTrendingUp, FiUsers } from 'react-icons/fi';
import Button from '../../components/buttons/Button';
import CourtCard from '../../components/cards/CourtCard';
import StatCard from '../../components/cards/StatCard';
import courts from '../../data/courts.json';

export default function Home() {
  return (
    <>
      <section className="hero" id="top">
        <img src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1800&q=80" alt="Futsal players competing" />
        <div className="hero-overlay" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <motion.div className="floating-ball" aria-hidden="true" animate={{ y: [0, -18, 0], rotate: [0, 16, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>⚽</motion.div>
        <motion.div className="hero-content" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="trusted-badge"><FiCheckCircle /> Trusted by 18 premium venues</div>
          <p className="eyebrow">Premium Futsal Booking Platform</p>
          <h1>Book elite futsal courts with match-day confidence.</h1>
          <p>Discover high-quality venues, reserve prime slots, and manage every booking inside a polished sports platform built for players and operators.</p>
          <div className="hero-actions">
            <Button to="/courts" icon={<FiCalendar />}>Book Now</Button>
            <Button to="/courts" variant="outline" icon={<FiArrowRight />}>Explore Courts</Button>
          </div>
          <div className="hero-stats">
            <div><strong>840+</strong><span>monthly bookings</span></div>
            <div><strong>4.8</strong><span>average rating</span></div>
            <div><strong>12k+</strong><span>active players</span></div>
          </div>
        </motion.div>
        <motion.a className="scroll-indicator" href="#featured-courts" aria-label="Scroll to featured courts" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <FiArrowDown />
        </motion.a>
      </section>

      <section className="section" id="featured-courts">
        <div className="section-title">
          <p className="eyebrow">Featured Courts</p>
          <h2>Book standout venues in seconds</h2>
        </div>
        <div className="court-grid">{courts.slice(0, 3).map((court) => <CourtCard court={court} key={court.id} />)}</div>
      </section>

      <section className="section feature-band">
        {[
          ['Instant slot discovery', 'Browse availability, pricing, ratings, and facilities with no clutter.'],
          ['Match-ready dashboards', 'Players and admins get clean views for bookings, payments, and reports.'],
          ['Backend-ready structure', 'Services are abstracted so API integration can land cleanly later.'],
        ].map(([title, text]) => (
          <article className="glass-card" key={title}>
            {title.includes('Instant') ? <FiTrendingUp /> : title.includes('dashboards') ? <FiShield /> : <FiStar />}
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">Why Choose Us</p>
          <h2>Built for players, organizers, and venue owners</h2>
          <p className="muted">FutsalPro brings the polish of a modern SaaS dashboard to sports venue management while keeping the booking journey fast and friendly.</p>
          <div className="stats-grid compact">
            <StatCard icon={<FiUsers />} label="Active players" value="12k+" note="Across partner venues" />
            <StatCard icon={<FiShield />} label="Court uptime" value="99%" note="Operational visibility" />
          </div>
        </div>
        <img className="rounded-image" src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80" alt="Indoor football game" />
      </section>

      <section className="section">
        <div className="stats-grid">
          <StatCard icon={<FiCalendar />} label="Monthly bookings" value="840+" note="Mock platform data" />
          <StatCard icon={<FiStar />} label="Average rating" value="4.8" note="From court reviews" />
          <StatCard icon={<FiUsers />} label="Partner venues" value="18" note="Growing network" />
        </div>
      </section>

      <section className="section gallery">
        {courts.map((court) => <img key={court.id} src={court.image} alt={court.name} />)}
      </section>

      <section className="section testimonials">
        <article>
          <p>"The booking flow feels fast, premium, and clear. Our team found an evening slot in under a minute."</p>
          <strong>Nisha Tamang</strong>
        </article>
        <article>
          <p>"The admin pages already feel ready for real operations once APIs are connected."</p>
          <strong>Venue Manager</strong>
        </article>
      </section>

      <section className="section partners">
        <span>SportHub</span><span>GoalLine</span><span>UrbanFit</span><span>MatchDay</span>
      </section>

      <section className="newsletter">
        <h2>Get weekly court drops and league updates</h2>
        <form>
          <input placeholder="Email address" type="email" />
          <Button type="submit">Subscribe</Button>
        </form>
      </section>
    </>
  );
}

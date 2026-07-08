import { motion } from 'framer-motion';
import { FiHeart, FiMapPin, FiStar } from 'react-icons/fi';
import Button from '../buttons/Button';
import Badge from '../common/Badge';

export default function CourtCard({ court }) {
  const tone = court.availability === 'Available' ? 'green' : court.availability === 'Few Slots' ? 'yellow' : 'red';
  return (
    <motion.article className="court-card" whileHover={{ y: -10, scale: 1.015 }} transition={{ duration: 0.28 }}>
      <div className="media">
        <img src={court.image} alt={court.name} />
        <Badge tone={tone}>{court.availability}</Badge>
        <button className="favorite-btn" type="button" aria-label={`Save ${court.name}`}><FiHeart /></button>
      </div>
      <div className="court-card-body">
        <div className="card-title-row">
          <h3>{court.name}</h3>
          <span className="rating"><FiStar /> {court.rating}</span>
        </div>
        <p><FiMapPin /> {court.location}</p>
        <div className="mini-chip-row">{court.facilities.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>
        <strong>NPR {court.price.toLocaleString()} / hour</strong>
        <div className="card-actions">
          <Button to={`/booking/${court.id}`} variant="primary">Book Now</Button>
          <Button to={`/courts/${court.id}`} variant="ghost">View Details</Button>
        </div>
      </div>
    </motion.article>
  );
}

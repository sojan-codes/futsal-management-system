import { useParams } from 'react-router-dom';
import { FiClock, FiMapPin, FiStar } from 'react-icons/fi';
import Button from '../../components/buttons/Button';
import Badge from '../../components/common/Badge';
import courts from '../../data/courts.json';

export default function CourtDetails() {
  const { id } = useParams();
  const court = courts.find((item) => item.id === id) || courts[0];

  return (
    <section className="section page">
      <div className="details-hero">
        <img src={court.image} alt={court.name} />
        <div>
          <Badge>{court.availability}</Badge>
          <h1>{court.name}</h1>
          <p><FiMapPin /> {court.location}</p>
          <p>{court.description}</p>
          <div className="details-meta">
            <span><FiStar /> {court.rating} rating</span>
            <span>NPR {court.price.toLocaleString()} / hour</span>
          </div>
          <Button to={`/booking/${court.id}`}>Book Now</Button>
        </div>
      </div>
      <div className="info-grid">
        <article className="glass-card"><h3>Facilities</h3><div className="chip-list">{court.facilities.map((item) => <span key={item}>{item}</span>)}</div></article>
        <article className="glass-card"><h3>Available Time Slots</h3><div className="chip-list">{court.slots.map((slot) => <span key={slot}><FiClock /> {slot}</span>)}</div></article>
        <article className="glass-card"><h3>Pricing</h3><p>NPR {court.price.toLocaleString()} per hour. Multi-hour totals are calculated on the booking page.</p></article>
      </div>
    </section>
  );
}

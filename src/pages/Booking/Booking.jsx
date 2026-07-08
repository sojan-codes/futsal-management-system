import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import Alert from '../../components/common/Alert';
import PageHeader from '../../components/common/PageHeader';
import TextInput from '../../components/forms/TextInput';
import courts from '../../data/courts.json';

export default function Booking() {
  const { courtId } = useParams();
  const initialCourt = courts.find((court) => court.id === courtId) || courts[0];
  const [selectedCourtId, setSelectedCourtId] = useState(initialCourt.id);
  const [date, setDate] = useState('2026-07-12');
  const [time, setTime] = useState(initialCourt.slots[0]);
  const [duration, setDuration] = useState(1);
  const [done, setDone] = useState(false);
  const court = useMemo(() => courts.find((item) => item.id === selectedCourtId), [selectedCourtId]);
  const total = court.price * Number(duration || 1);

  return (
    <section className="section page">
      <PageHeader eyebrow="Booking" title="Reserve your court" text="Frontend-only booking form with live total calculation and summary." />
      <div className="form-layout">
        <form className="panel" onSubmit={(event) => { event.preventDefault(); setDone(true); }}>
          {done && <Alert>Mock booking created. Backend integration can replace this submit handler later.</Alert>}
          <label className="field"><span>Court</span><select value={selectedCourtId} onChange={(event) => setSelectedCourtId(event.target.value)}>{courts.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
          <TextInput label="Date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          <label className="field"><span>Time</span><select value={time} onChange={(event) => setTime(event.target.value)}>{court.slots.map((slot) => <option key={slot}>{slot}</option>)}</select></label>
          <TextInput label="Duration (hours)" type="number" min="1" max="4" value={duration} onChange={(event) => setDuration(event.target.value)} />
          <Button type="submit">Book Court</Button>
        </form>
        <aside className="summary-card">
          <img src={court.image} alt={court.name} />
          <h3>Booking Summary</h3>
          <p>{court.name}</p>
          <p>{date} at {time}</p>
          <p>{duration} hour(s) × NPR {court.price.toLocaleString()}</p>
          <strong>Total: NPR {total.toLocaleString()}</strong>
          <Button to="/payment" variant="secondary">Continue to Payment</Button>
        </aside>
      </div>
    </section>
  );
}

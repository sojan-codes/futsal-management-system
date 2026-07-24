import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import Alert from '../../components/common/Alert';
import PageHeader from '../../components/common/PageHeader';
import TextInput from '../../components/forms/TextInput';
import { getCourtAvailability, getCourts } from '../../services/courtService';
import { createBooking } from '../../services/bookingService';

const localToday = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

export default function Booking() {
  const { courtId } = useParams();
  const [courts, setCourts] = useState([]);
  const [selectedCourtId, setSelectedCourtId] = useState(courtId || '');
  const [date, setDate] = useState(localToday);
  const [time, setTime] = useState('18:00');
  const [duration, setDuration] = useState(1);
  const [message, setMessage] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => { getCourts().then(({ data }) => { const list = data.results || data; setCourts(list); if (!selectedCourtId && list[0]) setSelectedCourtId(String(list[0].id)); }).catch(() => setMessage('Unable to load courts. Please try again later.')).finally(() => setLoading(false)); }, []);
  useEffect(() => {
    if (!selectedCourtId || !date) return;
    getCourtAvailability(selectedCourtId, date, duration).then(({ data }) => {
      setAvailableSlots(data.available_slots);
      if (!data.available_slots.includes(time)) setTime(data.available_slots[0] || '');
    }).catch(() => setAvailableSlots([]));
  }, [selectedCourtId, date, duration]);
  const court = useMemo(() => courts.find((item) => String(item.id) === String(selectedCourtId)), [courts, selectedCourtId]);
  const total = Number(court?.price || 0) * Number(duration || 1);
  if (loading) return <section className="section page"><div className="panel">Loading courts…</div></section>;
  if (!court) return <section className="section page"><Alert tone="error">No courts are currently available for booking.</Alert></section>;

  return (
    <section className="section page">
      <PageHeader eyebrow="Booking" title="Reserve your court" text="Choose a time, then reserve your court securely." />
      <div className="form-layout">
        <form className="panel" onSubmit={async (event) => { event.preventDefault(); try { const { data } = await createBooking({ court_id: Number(selectedCourtId), booking_date: date, start_time: time, duration: Number(duration) }); navigate(`/payment?booking=${encodeURIComponent(data.id)}`); } catch (error) { setMessage(error.response?.data?.start_time?.[0] || error.response?.data?.duration?.[0] || 'Unable to create this booking.'); } }}>
          {message && <Alert>{message}</Alert>}
          <label className="field"><span>Court</span><select value={selectedCourtId} onChange={(event) => setSelectedCourtId(event.target.value)}>{courts.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
          <TextInput label="Date" type="date" min={localToday()} value={date} onChange={(event) => setDate(event.target.value)} />
          <label className="field"><span>Start time</span><select required value={time} onChange={(event) => setTime(event.target.value)} disabled={!availableSlots.length}><option value="">{availableSlots.length ? 'Choose a time' : 'No available slots'}</option>{availableSlots.map((slot) => <option value={slot} key={slot}>{slot}</option>)}</select></label>
          <TextInput label="Duration (hours)" type="number" min="1" max="4" value={duration} onChange={(event) => setDuration(event.target.value)} />
          <Button type="submit" disabled={!time}>Book Court</Button>
        </form>
        <aside className="summary-card">
          {court.image && <img src={court.image} alt={court.name} />}
          <h3>Booking Summary</h3>
          <p>{court.name}</p>
          <p>{date} at {time}</p>
          <p>{duration} hour(s) × NPR {Number(court.price).toLocaleString()}</p>
          <strong>Total: NPR {total.toLocaleString()}</strong>
        </aside>
      </div>
    </section>
  );
}

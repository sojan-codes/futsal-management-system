import AdminLayout from '../../components/layout/AdminLayout';
import { useEffect, useState } from 'react';
import Badge from '../../components/common/Badge';
import Button from '../../components/buttons/Button';
import { getCourts } from '../../services/courtService';
import { createCourt, deactivateCourt, updateCourt } from '../../services/courtService';
import Alert from '../../components/common/Alert';

export default function AdminCourts() {
  const [courts, setCourts] = useState([]); const [editing, setEditing] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [form, setForm] = useState({ name: '', location: '', description: '', price_per_hour: '', facilities: '' });
  const load = async () => { setLoading(true); setError(''); try { const { data } = await getCourts(); setCourts(Array.isArray(data) ? data : data.results || []); } catch (err) { setError(err.response?.data?.detail || 'Unable to load court data.'); } finally { setLoading(false); } }; useEffect(() => { load(); }, []);
  const save = async (event) => { event.preventDefault(); try { const payload = { ...form, price_per_hour: Number(form.price_per_hour), facilities: form.facilities.split(',').map((item) => item.trim()).filter(Boolean) }; if (editing) await updateCourt(editing, payload); else await createCourt(payload); setEditing(null); setForm({ name: '', location: '', description: '', price_per_hour: '', facilities: '' }); load(); } catch (err) { setError(err.response?.data?.detail || 'Unable to save this court.'); } };
  const edit = (court) => { setEditing(court.id); setForm({ name: court.name || '', location: court.location || '', description: court.description || '', price_per_hour: court.price_per_hour || '', facilities: Array.isArray(court.facilities) ? court.facilities.join(', ') : '' }); };
  return (
    <AdminLayout title="Courts">
      <div className="toolbar"><span className="muted">Manage court inventory and display status.</span><Button onClick={() => { setEditing(null); setForm({ name: '', location: '', description: '', price_per_hour: '', facilities: '' }); }}>Add Court</Button></div>
      {error && <Alert>{error}</Alert>}
      <form className="panel mb-6" onSubmit={save}><h3>{editing ? 'Edit court' : 'Add court'}</h3><input required placeholder="Court name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /><input required placeholder="Price per hour" type="number" value={form.price_per_hour} onChange={(e) => setForm({ ...form, price_per_hour: e.target.value })} /><input required placeholder="Facilities, comma separated" value={form.facilities} onChange={(e) => setForm({ ...form, facilities: e.target.value })} /><textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /><Button type="submit">{editing ? 'Save Changes' : 'Create Court'}</Button></form>
      {loading ? <div className="panel">Loading courts…</div> : <div className="table-wrap"><table><thead><tr><th>Court Name</th><th>Location</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead><tbody>{courts.map((court) => <tr key={court.id}><td>{court.name}</td><td>{court.location}</td><td>NPR {Number(court.price || 0).toLocaleString()}</td><td><Badge>{court.availability || 'Unavailable'}</Badge></td><td><button className="text-btn" onClick={() => edit(court)}>Edit</button><button className="text-btn danger" onClick={() => deactivateCourt(court.id).then(load).catch(() => setError('Unable to deactivate this court.'))}>Deactivate</button></td></tr>)}</tbody></table></div>}
    </AdminLayout>
  );
}

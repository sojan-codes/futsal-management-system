import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import TextInput from '../../components/forms/TextInput';
import Alert from '../../components/common/Alert';
import { useAuth } from '../../context/AuthContext';
import { registerFutsalOwner } from '../../services/authService';

const empty = { fullName: '', email: '', phone: '', password: '', confirm: '', futsalName: '', location: '', description: '', price: '', image: '', openingTime: '06:00', closingTime: '22:00', facilities: '' };
function firstError(error) { const data = error.response?.data; if (!data) return 'Cannot reach the server. Ensure Django is running.'; return data.detail || Object.values(data).flat().find((item) => typeof item === 'string') || 'Unable to create account.'; }

export default function Signup() {
  const [type, setType] = useState('player'); const [values, setValues] = useState(empty); const [message, setMessage] = useState(''); const navigate = useNavigate(); const { signup } = useAuth();
  const set = (key) => (event) => setValues({ ...values, [key]: event.target.value });
  const submit = async (event) => {
    event.preventDefault(); setMessage('');
    if (values.password !== values.confirm) return setMessage('Passwords must match.');
    try {
      if (type === 'player') { await signup(values); navigate('/dashboard'); return; }
      await registerFutsalOwner({ full_name: values.fullName, email: values.email, phone: values.phone, password: values.password, confirm_password: values.confirm, futsal_name: values.futsalName, location: values.location, description: values.description, price_per_hour: values.price, image: values.image, opening_time: values.openingTime, closing_time: values.closingTime, facilities: values.facilities.split(',').map((item) => item.trim()).filter(Boolean) });
      setMessage('Registration submitted. A Super Admin will review your futsal before you can log in.'); setValues(empty);
    } catch (error) { setMessage(firstError(error)); }
  };
  return <section className="auth-page"><form className="auth-card" onSubmit={submit}>
    <p className="eyebrow">Join FutsalPro</p><h1 className="text-3xl font-bold">Create Account</h1>
    <div className="toolbar"><Button type="button" variant={type === 'player' ? 'primary' : 'ghost'} onClick={() => setType('player')}>Player</Button><Button type="button" variant={type === 'owner' ? 'primary' : 'ghost'} onClick={() => setType('owner')}>Register Futsal</Button></div>
    {message && <Alert>{message}</Alert>}
    <TextInput label="Full Name" required value={values.fullName} onChange={set('fullName')} /><TextInput label="Email" type="email" required value={values.email} onChange={set('email')} /><TextInput label="Phone Number" required value={values.phone} onChange={set('phone')} />
    {type === 'owner' && <><TextInput label="Futsal Name" required value={values.futsalName} onChange={set('futsalName')} /><TextInput label="Location" required value={values.location} onChange={set('location')} /><TextInput label="Image URL" type="url" value={values.image} onChange={set('image')} /><TextInput label="Price per hour (NPR)" type="number" required value={values.price} onChange={set('price')} /><TextInput label="Opening time" type="time" required value={values.openingTime} onChange={set('openingTime')} /><TextInput label="Closing time" type="time" required value={values.closingTime} onChange={set('closingTime')} /><TextInput label="Facilities (comma separated)" value={values.facilities} onChange={set('facilities')} /><label className="field"><span>Description</span><textarea required value={values.description} onChange={set('description')} /></label></>}
    <TextInput label="Password" type="password" required value={values.password} onChange={set('password')} /><TextInput label="Confirm Password" type="password" required value={values.confirm} onChange={set('confirm')} />
    <Button type="submit">{type === 'player' ? 'Create Player Account' : 'Submit Futsal Registration'}</Button><p className="auth-switch mt-8">Already have an account? <Link to="/login">Login</Link></p>
  </form></section>;
}

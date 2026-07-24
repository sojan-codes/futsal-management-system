import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import TextInput from '../../components/forms/TextInput';
import Alert from '../../components/common/Alert';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [values, setValues] = useState({ email: '', password: '' }); const [error, setError] = useState(''); const { adminLogin } = useAuth(); const navigate = useNavigate();
  const submit = async (event) => { event.preventDefault(); try { await adminLogin(values); navigate('/admin'); } catch (e) { setError(e.response?.data?.detail || 'Admin sign-in failed.'); } };
  return <section className="auth-page"><form className="auth-card" onSubmit={submit}><p className="eyebrow">Private Access</p><h1 className="text-3xl font-bold">Admin Console</h1>{error && <Alert>{error}</Alert>}<TextInput label="Admin email" type="email" required value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} /><TextInput label="Password" type="password" required value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} /><Button type="submit">Access Admin Console</Button></form></section>;
}

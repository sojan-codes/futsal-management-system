import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Alert from '../../components/common/Alert';
import Button from '../../components/buttons/Button';
import TextInput from '../../components/forms/TextInput';
import { resetPassword } from '../../services/authService';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const submit = async (event) => {
    event.preventDefault();
    if (password !== confirm) return setMessage('Passwords do not match.');
    try { const { data } = await resetPassword({ uid: params.get('uid'), token: params.get('token'), password }); setMessage(data.detail); }
    catch (error) { setMessage(error.response?.data?.password?.[0] || error.response?.data?.detail || 'Unable to reset your password.'); }
  };
  return <section className="auth-page"><form className="auth-card" onSubmit={submit}><p className="eyebrow">Account recovery</p><h1 className="text-3xl font-bold">Choose a new password</h1>{message && <Alert>{message}</Alert>}<TextInput label="New password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} /><TextInput label="Confirm password" type="password" required value={confirm} onChange={(event) => setConfirm(event.target.value)} /><Button type="submit">Reset Password</Button><p className="auth-switch mt-8"><Link to="/login">Back to login</Link></p></form></section>;
}

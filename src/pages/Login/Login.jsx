import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiFacebook, FiLock, FiMail } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Button from '../../components/buttons/Button';
import Alert from '../../components/common/Alert';
import TextInput from '../../components/forms/TextInput';
import { useAuth } from '../../context/AuthContext';

function apiErrorMessage(error) {
  const data = error.response?.data;
  if (!data) return 'Cannot reach the server. Ensure Django is running at http://127.0.0.1:8000.';
  return data.detail || Object.values(data).flat().find((message) => typeof message === 'string') || 'Unable to sign in.';
}

export default function Login() {
  const [values, setValues] = useState({ email: '', password: '', remember: true });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!values.email.includes('@')) nextErrors.email = 'Enter a valid email.';
    if (values.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    try { const user = await login(values); navigate(user.is_admin_console ? '/admin' : '/dashboard'); }
    catch (error) { setErrors({ form: apiErrorMessage(error) }); }
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <p className="eyebrow">Welcome Back</p>
        <h1 className="text-3xl font-bold">Login</h1>
        {errors.form && <Alert tone="error">{errors.form}</Alert>}
        <TextInput label="Email" type="email" value={values.email} error={errors.email} onChange={(event) => setValues({ ...values, email: event.target.value })} placeholder="you@example.com" />
        <TextInput label="Password" type="password" value={values.password} error={errors.password} onChange={(event) => setValues({ ...values, password: event.target.value })} placeholder="Minimum 6 characters" />
        <div className="form-row"><label><input type="checkbox" checked={values.remember} onChange={(event) => setValues({ ...values, remember: event.target.checked })} /> Remember me</label><Link to="/forgot-password">Forgot Password?</Link></div>
        <Button type="submit" icon={<FiLock />}>Login</Button>
        <button className="social-btn" type="button"><FcGoogle /> Continue with Google</button>
        <p className="auth-switch mt-8">No account? <Link to="/signup">Create one</Link></p>
      </form>
    </section>
  );
}

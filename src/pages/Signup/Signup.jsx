import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/buttons/Button';
import TextInput from '../../components/forms/TextInput';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const [values, setValues] = useState({ fullName: '', email: '', phone: '', password: '', confirm: '', agree: false });
  const [errors, setErrors] = useState({});
  const { signup } = useAuth();
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!values.fullName.trim()) nextErrors.fullName = 'Full name is required.';
    if (!values.email.includes('@')) nextErrors.email = 'Valid email is required.';
    if (values.phone.length < 7) nextErrors.phone = 'Phone number is required.';
    if (values.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    if (values.password !== values.confirm) nextErrors.confirm = 'Passwords must match.';
    if (!values.agree) nextErrors.agree = 'Please accept the terms.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    signup(values);
    navigate('/dashboard');
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <p className="eyebrow">Join FutsalPro</p>
        <h1>Create Account</h1>
        <TextInput label="Full Name" value={values.fullName} error={errors.fullName} onChange={(event) => setValues({ ...values, fullName: event.target.value })} />
        <TextInput label="Email" type="email" value={values.email} error={errors.email} onChange={(event) => setValues({ ...values, email: event.target.value })} />
        <TextInput label="Phone Number" value={values.phone} error={errors.phone} onChange={(event) => setValues({ ...values, phone: event.target.value })} />
        <TextInput label="Password" type="password" value={values.password} error={errors.password} onChange={(event) => setValues({ ...values, password: event.target.value })} />
        <TextInput label="Confirm Password" type="password" value={values.confirm} error={errors.confirm} onChange={(event) => setValues({ ...values, confirm: event.target.value })} />
        <label className="checkbox-line"><input type="checkbox" checked={values.agree} onChange={(event) => setValues({ ...values, agree: event.target.checked })} /> I agree to the booking terms</label>
        {errors.agree && <small className="field-error">{errors.agree}</small>}
        <Button type="submit">Create Account</Button>
        <p className="auth-switch">Already have account? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}

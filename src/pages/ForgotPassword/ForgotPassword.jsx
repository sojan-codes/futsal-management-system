import { useState } from 'react';
import Button from '../../components/buttons/Button';
import Alert from '../../components/common/Alert';
import PageHeader from '../../components/common/PageHeader';
import TextInput from '../../components/forms/TextInput';
import { requestPasswordReset } from '../../services/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <section className="section page narrow">
      <PageHeader eyebrow="Reset" title="Forgot password" text="Frontend-only reset request. No email is sent." />
      <form className="panel" onSubmit={async (event) => { event.preventDefault(); await requestPasswordReset(email); setSent(true); }}>
        {sent && <Alert>If the account exists, reset instructions have been sent.</Alert>}
        <TextInput label="Email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
        <Button type="submit">Send Reset Link</Button>
      </form>
    </section>
  );
}

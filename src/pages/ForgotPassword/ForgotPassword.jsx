import { useState } from 'react';
import Button from '../../components/buttons/Button';
import Alert from '../../components/common/Alert';
import PageHeader from '../../components/common/PageHeader';
import TextInput from '../../components/forms/TextInput';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <section className="section page narrow">
      <PageHeader eyebrow="Reset" title="Forgot password" text="Frontend-only reset request. No email is sent." />
      <form className="panel" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
        {sent && <Alert>Mock reset link prepared for {email}.</Alert>}
        <TextInput label="Email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
        <Button type="submit">Send Reset Link</Button>
      </form>
    </section>
  );
}

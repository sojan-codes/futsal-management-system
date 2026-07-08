import Button from '../../components/buttons/Button';

export default function NotFound() {
  return (
    <section className="section page narrow not-found">
      <h1>404</h1>
      <p>This page is outside the current futsal route map.</p>
      <Button to="/">Back Home</Button>
    </section>
  );
}

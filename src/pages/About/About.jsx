import PageHeader from '../../components/common/PageHeader';

export default function About() {
  return (
    <section className="section page">
      <PageHeader eyebrow="About" title="A frontend foundation for premium futsal operations" text="FutsalPro is designed as a complete React frontend that backend teams can connect to real APIs without rethinking the user experience." />
      <div className="info-grid">
        <article className="glass-card"><h3>For Players</h3><p>Find courts, compare prices, book slots, track payments, and manage profiles.</p></article>
        <article className="glass-card"><h3>For Admins</h3><p>Review bookings, manage courts, monitor users, and inspect mock revenue reports.</p></article>
        <article className="glass-card"><h3>For Backend Teams</h3><p>Service files isolate future API work while the UI runs today with JSON data.</p></article>
      </div>
    </section>
  );
}

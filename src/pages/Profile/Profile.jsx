import ProfileCard from '../../components/cards/ProfileCard';
import PageHeader from '../../components/common/PageHeader';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <section className="section page narrow">
      <PageHeader eyebrow="Profile" title="Your player profile" text="Frontend-only profile controls ready for future update endpoints." />
      <ProfileCard user={user} />
    </section>
  );
}

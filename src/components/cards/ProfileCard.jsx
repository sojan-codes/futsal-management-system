import Button from '../buttons/Button';

export default function ProfileCard({ user }) {
  return (
    <article className="profile-card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </article>
  );
}

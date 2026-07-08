import { motion } from 'framer-motion';

export default function StatCard({ icon, label, value, note }) {
  return (
    <motion.article className="stat-card" whileHover={{ y: -4 }}>
      <div className="stat-icon">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        {note && <small>{note}</small>}
      </div>
    </motion.article>
  );
}

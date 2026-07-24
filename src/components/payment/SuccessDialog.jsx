import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
export default function SuccessDialog({ title, description, onClose }) {
  return <motion.div className="success-dialog" initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }}><motion.div className="success-mark" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.16 }}><Check size={38} strokeWidth={3} /></motion.div><h2>{title}</h2><p>{description}</p><button className="btn btn-primary" type="button" onClick={onClose}>Done</button></motion.div>;
}

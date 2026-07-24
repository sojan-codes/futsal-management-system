import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
export default function LoadingOverlay({ message = 'Verifying Payment...', progress }) {
  return <motion.div className="payment-loading-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div><LoaderCircle className="loading-orbit" size={38} /><strong>{message}</strong>{typeof progress === 'number' && <div className="upload-progress"><span style={{ width: `${progress}%` }} /><small>{progress}% uploaded</small></div>}</div></motion.div>;
}

import { motion } from 'framer-motion';
import { FileImage, Trash2 } from 'lucide-react';

const readableSize = (bytes) => `${(bytes / 1024 / 1024).toFixed(bytes > 1024 * 1024 ? 2 : 1)} MB`;

export default function ImagePreview({ file, preview, onRemove }) {
  if (!file || !preview) return null;
  return <motion.article className="image-preview-card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}>
    <img src={preview} alt={`Preview of ${file.name}`} />
    <div className="image-preview-info"><FileImage size={17} /><span><strong>{file.name}</strong><small>{readableSize(file.size)}</small></span></div>
    <button type="button" className="image-remove" onClick={onRemove} aria-label={`Remove ${file.name}`}><Trash2 size={17} /></button>
  </motion.article>;
}

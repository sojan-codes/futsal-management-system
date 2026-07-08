import { motion } from 'framer-motion';

export default function PageHeader({ eyebrow, title, text, actions }) {
  return (
    <motion.section
      className="page-header"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <div className="page-header-grid">
        <div>
          <h1>{title}</h1>
          {text && <p>{text}</p>}
        </div>
        {actions && <div className="page-actions">{actions}</div>}
      </div>
    </motion.section>
  );
}

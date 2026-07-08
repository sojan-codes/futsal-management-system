import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Button({ children, to, type = 'button', variant = 'primary', icon, className = '', ...props }) {
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );
  const classes = `btn btn-${variant} ${className}`;

  if (to) {
    return (
      <motion.div className="btn-motion" whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.97 }}>
        <Link className={classes} to={to} {...props}>{content}</Link>
      </motion.div>
    );
  }

  return (
    <motion.button whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.97 }} className={classes} type={type} {...props}>
      {content}
    </motion.button>
  );
}

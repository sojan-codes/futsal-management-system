import { FiX } from 'react-icons/fi';

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-head">
          <h3>{title}</h3>
          <button type="button" onClick={onClose} aria-label="Close modal"><FiX /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

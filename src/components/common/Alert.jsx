export default function Alert({ children, type = 'success' }) {
  return <div className={`alert alert-${type}`}>{children}</div>;
}

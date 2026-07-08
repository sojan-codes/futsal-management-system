export default function Filters({ options = [], active, onChange }) {
  return (
    <div className="filters">
      {options.map((option) => (
        <button
          className={active === option ? 'active' : ''}
          key={option}
          onClick={() => onChange(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

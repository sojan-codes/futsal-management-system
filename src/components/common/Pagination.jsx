export default function Pagination() {
  return (
    <div className="pagination" aria-label="Pagination">
      <button type="button">Prev</button>
      <button type="button" className="active">1</button>
      <button type="button">2</button>
      <button type="button">Next</button>
    </div>
  );
}

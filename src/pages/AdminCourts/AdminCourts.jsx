import AdminLayout from '../../components/layout/AdminLayout';
import Badge from '../../components/common/Badge';
import Button from '../../components/buttons/Button';
import courts from '../../data/courts.json';

export default function AdminCourts() {
  return (
    <AdminLayout title="Courts">
      <div className="toolbar"><span className="muted">Manage court inventory and display status.</span><Button>Add Court</Button></div>
      <div className="table-wrap"><table><thead><tr><th>Court Name</th><th>Location</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead><tbody>{courts.map((court) => <tr key={court.id}><td>{court.name}</td><td>{court.location}</td><td>NPR {court.price.toLocaleString()}</td><td><Badge>{court.availability}</Badge></td><td><button className="text-btn">Edit</button><button className="text-btn danger">Delete</button></td></tr>)}</tbody></table></div>
    </AdminLayout>
  );
}

import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Badge from '../../components/common/Badge';
import Button from '../../components/buttons/Button';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/common/SearchBar';
import users from '../../data/users.json';

export default function AdminUsers() {
  const [query, setQuery] = useState('');
  const filtered = users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <AdminLayout title="Users">
      <div className="toolbar"><SearchBar value={query} onChange={setQuery} placeholder="Search users" /><Button>Add User</Button></div>
      <div className="table-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered.map((user) => <tr key={user.id}><td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.phone}</td><td>{user.role}</td><td><Badge tone={user.status === 'Active' ? 'green' : 'red'}>{user.status}</Badge></td><td><button className="text-btn">Edit</button><button className="text-btn danger">Delete</button></td></tr>)}</tbody></table></div>
      <Pagination />
    </AdminLayout>
  );
}

import { useState } from 'react';
import { useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Badge from '../../components/common/Badge';
import Button from '../../components/buttons/Button';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/common/SearchBar';
import { getUsers, updateUser } from '../../services/userService';
import apiClient from '../../services/apiClient';

export default function AdminUsers() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]); const [requests, setRequests] = useState([]);
  const load = () => { getUsers().then(({ data }) => setUsers(data.results || data)); apiClient.get('/auth/owner-requests').then(({ data }) => setRequests(data)); };
  useEffect(load, []);
  const filtered = users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <AdminLayout title="Users">
      <div className="toolbar"><SearchBar value={query} onChange={setQuery} placeholder="Search users" /><Button>Add User</Button></div>
      {requests.length > 0 && <div className="panel mb-6"><h3>Pending Futsal Registrations</h3>{requests.map((request) => <div className="report-row" key={request.id}><span>{request.name} · {request.location} · {request.owner.email}</span><Button onClick={() => apiClient.post(`/auth/owner-requests/${request.id}/approve`).then(load)}>Approve</Button></div>)}</div>}
      <div className="table-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered.map((user) => <tr key={user.id}><td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.phone}</td><td>{user.role}</td><td><Badge tone={user.status === 'ACTIVE' ? 'green' : 'red'}>{user.status}</Badge></td><td><button className="text-btn danger" onClick={() => updateUser(user.id, { status: user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' }).then(load)}>{user.status === 'ACTIVE' ? 'Suspend' : 'Activate'}</button></td></tr>)}</tbody></table></div>
      <Pagination />
    </AdminLayout>
  );
}

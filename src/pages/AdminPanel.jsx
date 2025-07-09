import TicketList from '../components/TicketList';
import { useAuth } from '../context/AuthContext';

export default function AdminPanel() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <TicketList user={user} isAdmin={true}/>
    </div>
  );
}

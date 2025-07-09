import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

export default function Navbar({ user }) {
  const isAdmin = /^[a-zA-Z0-9._%+-]+_admin@/.test(user?.email);
  const isLoggedIn = !!user;

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Service Desk</h1>

      <div className="space-x-4 flex items-center">
        <Link to="/dashboard" className="hover:underline">Home</Link>

        {isLoggedIn && (
          <>
            <Link to="/new-ticket" className="hover:underline">New Ticket</Link>
            <Link to="/my-tickets" className="hover:underline">My Tickets</Link>
            {isAdmin && (
              <Link to="/admin" className="hover:underline">View Customer Tickets</Link>
            )}
            <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
}

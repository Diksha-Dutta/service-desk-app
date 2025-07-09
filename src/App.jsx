import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Routes, Route, Navigate } from 'react-router-dom';

import { auth } from './firebase';
import Login from './pages/Login';
import Register from './pages/Register';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [authStateChecked, setAuthStateChecked] = useState(false);
  const isAdmin = /^[a-zA-Z0-9._%+-]+_admin@/.test(user?.email);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthStateChecked(true);
    });
    return () => unsub();
  }, []);

  if (!authStateChecked) return <p>Loading...</p>;

  return (
    <Layout user={user}>
      <Routes>
      
        <Route path="/" element={<Dashboard user={user} />} />

      
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

     
        {user && (
          <>
            <Route path="/my-tickets" element={<TicketList user={user} isAdmin={false} />} />
            <Route path="/new-ticket" element={<TicketForm user={user} />} />
            <Route
              path="/admin"
              element={isAdmin ? <AdminDashboard user={user} /> : <Navigate to="/" />}
            />
          </>
        )}

      
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

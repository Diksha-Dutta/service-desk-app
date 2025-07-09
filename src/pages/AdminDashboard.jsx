import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

export default function AdminDashboard({ user }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'tickets'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setTickets(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const updateStatus = async (ticketId, newStatus) => {
    try {
      const ticketRef = doc(db, 'tickets', ticketId);
      await updateDoc(ticketRef, { status: newStatus });
    } catch (err) {
      console.error('❌ Failed to update status:', err);
      alert('Failed to update ticket status.');
    }
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      await deleteDoc(doc(db, 'tickets', ticketId));
      alert('🗑️ Ticket deleted successfully.');
    } catch (err) {
      console.error('🔥 Failed to delete ticket:', err);
      alert('Could not delete ticket.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-indigo-700">Admin Dashboard — All Tickets</h1>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full text-sm bg-white border">
          <thead className="bg-indigo-100">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">User</th>
              <th className="text-left p-3">Priority</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Actions</th>
              <th className="text-left p-3">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t">
                <td className="p-3 font-medium">{ticket.title}</td>
                <td className="p-3">{ticket.email}</td>
                <td className="p-3">{ticket.priority}</td>
                <td className="p-3 text-gray-700">{ticket.status}</td>
        <td className="p-3 space-y-2">
  {ticket.status !== 'Resolved' && (
    <button
      onClick={() => updateStatus(ticket.id, 'Resolved')}
      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Resolve
    </button>
  )}
  {ticket.status === 'Open' && (
    <button
      onClick={() => updateStatus(ticket.id, 'In Progress')}
      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
    >
      Assign
    </button>
  )}
  <button
    onClick={() => handleDelete(ticket.id)}
    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
  >
    Delete
  </button>
  <div>
    <textarea
      rows={2}
      className="w-full mt-2 p-1 border rounded text-sm text-gray-700"
      placeholder="Add comment for user..."
      defaultValue={ticket.adminComment || ''}
      onBlur={async (e) => {
        const comment = e.target.value.trim();
        try {
          const ref = doc(db, 'tickets', ticket.id);
          await updateDoc(ref, { adminComment: comment });
          alert("📝 Comment saved!");
        } catch (err) {
          console.error("Failed to save comment:", err);
          alert("Couldn't save comment.");
        }
      }}
    />
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

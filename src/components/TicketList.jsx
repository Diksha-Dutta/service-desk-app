import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import TicketCard from './TicketCard';
import EditTicketForm from './EditTicketForm';

export default function TicketList({ user, isAdmin }) {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    const coll = collection(db, 'tickets');
    const q = isAdmin
      ? query(coll, orderBy('createdAt', 'desc'))
      : query(coll, where('userId', '==', user.uid), orderBy('createdAt', 'desc'));

    return onSnapshot(q, (snapshot) => {
      setTickets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, [user, isAdmin]);

  const handleDelete = async (ticketId) => {
    try {
      await deleteDoc(doc(db, 'tickets', ticketId));
      alert("🗑️ Ticket deleted!");
    } catch (err) {
      alert("Failed to delete ticket.");
    }
  };

  const handleModify = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleUpdate = async (updatedTicket) => {
  const ref = doc(db, 'tickets', updatedTicket.id);
  const updateData = {
    title: updatedTicket.title,
    description: updatedTicket.description,
    category: updatedTicket.category,
    priority: updatedTicket.priority,
    status: updatedTicket.status,
    createdAt: updatedTicket.createdAt,
    file: updatedTicket.file || '',
    updates: updatedTicket.updates || [],
  };

  
  if (updatedTicket.priority === 'High') {
    const paymentId = await loadRazorpay(updatedTicket.email);
    updateData.paymentId = paymentId || null;
    updateData.paymentStatus = paymentId ? 'Paid' : 'Unpaid';
  }

  try {
    await updateDoc(ref, updateData);
    alert(' Ticket updated!');
    setEditingTicket(null);
  } catch (err) {
    console.error('🔥 Update failed:', err);
    alert('Failed to update ticket.');
  }
};

  const loadRazorpay = (email) => {
    return new Promise((resolve) => {
      const options = {
        key: 'rzp_test_ABC123',
        amount: 100 * 100,
        currency: 'INR',
        name: 'Service Desk - Upgrade Priority',
        description: 'High Priority Ticket',
        handler: function (response) {
          resolve(response.razorpay_payment_id);
        },
        prefill: { email },
        theme: { color: '#6366F1' }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function () {
        alert("Payment failed. Ticket will be unpaid.");
        resolve(null);
      });
      rzp.open();
    });
  };

  return (
    <div>
      {tickets.length === 0 ? (
  <p className="text-center text-gray-600 mt-10 text-lg">😶 No tickets applied yet.</p>
) : (
  tickets.map(t => (
    <TicketCard
      key={t.id}
      ticket={t}
      isAdmin={isAdmin}
      onDelete={handleDelete}
      onModify={handleModify}
    />
  ))
)}


      {editingTicket && (
        <EditTicketForm
          ticket={editingTicket}
          onClose={() => setEditingTicket(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

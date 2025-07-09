import { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function TicketForm({ user }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Low');
  const [cat, setCat] = useState('Software');
  const [file, setFile] = useState(null);

  const submitTicket = async (paymentId = null, forcedPaymentStatus = null) => {
    let fileUrl = '';
    if (file) {
      const storageRef = ref(storage, `tickets/${Date.now()}_${file.name}`);
      const snap = await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(snap.ref);
    }

    await addDoc(collection(db, 'tickets'), {
      userId: user.uid,
      email: user.email,
      title,
      description: desc,
      priority,
      category: cat,
      status: 'Open',
      updates: [],
      file: fileUrl,
      paymentId: paymentId || null,
      paymentStatus: forcedPaymentStatus || (priority === 'High' ? 'Unpaid' : 'N/A'),
      createdAt: serverTimestamp(),
    });

    setTitle('');
    setDesc('');
    setPriority('Low');
    setCat('Software');
    setFile(null);
    alert('🎫 Ticket submitted successfully!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (priority === 'High') {
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded, creating ticket as unpaid.");
        await submitTicket(null, 'Unpaid');
        return;
      }

      const options = {
        key: 'rzp_test_ABC123', 
        amount: 100 * 100,
        currency: 'INR',
        name: 'High Priority Ticket',
        description: 'Fastlane Ticket Support',
        handler: async function (response) {
          await submitTicket(response.razorpay_payment_id, 'Paid');
        },
        prefill: { email: user.email },
        theme: { color: '#6366F1' },
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', async function () {
        alert(' Payment failed. Creating ticket as unpaid.');
        await submitTicket(null, 'Unpaid');
      });

      try {
        rzp.open();
      } catch (err) {
        console.error(' Razorpay open error:', err);
        await submitTicket(null, 'Unpaid');
      }
    } else {
      await submitTicket();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🎫 Raise a New Ticket</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Issue Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-md" required />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Category</label>
          <select value={cat} onChange={e => setCat(e.target.value)} className="w-full px-4 py-2 border rounded-md">
            <option>Software</option>
            <option>Hardware</option>
            <option>Network</option>
            <option>Others</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} className="w-full px-4 py-2 border rounded-md" rows="4" required></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Priority</label>
          <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full px-4 py-2 border rounded-md">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High (₹100)</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Attach Screenshot (optional)</label>
          <input type="file" onChange={e => setFile(e.target.files[0])} className="w-full px-2 py-1 border rounded-md text-sm" />
        </div>
      </div>

      <button type="submit" className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg">
        Submit Ticket
      </button>
    </form>
  );
}

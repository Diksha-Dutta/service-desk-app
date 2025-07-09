import { useState } from 'react';

export default function EditTicketForm({ ticket, onClose, onSave }) {
  const [title, setTitle] = useState(ticket.title);
  const [desc, setDesc] = useState(ticket.description);
  const [priority, setPriority] = useState(ticket.priority);
  const [category, setCategory] = useState(ticket.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...ticket, title, description: desc, priority, category });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">✏️ Edit Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Description"
            rows="4"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High (₹100)</option>
          </select>
          <select
            className="w-full p-2 border rounded"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option>Software</option>
            <option>Hardware</option>
            <option>Network</option>
            <option>Others</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { format } from 'date-fns';

export default function TicketCard({ ticket, isAdmin, onDelete, onModify }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-yellow-400 text-black';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-300 text-black';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-700';
      case 'In Progress': return 'bg-yellow-100 text-yellow-700';
      case 'Resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-700';
      case 'Unpaid': return 'bg-red-100 text-red-700';
      case 'N/A': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{ticket.title}</h3>
        <div className="text-right space-y-1">
          <span className={`text-sm px-2 py-1 rounded-full ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority}
          </span>
          {ticket.priority === 'High' && (
            <span
              className={`block text-sm px-2 py-1 rounded-full ${getPaymentColor(ticket.paymentStatus)}`}
              title={ticket.paymentId ? `Payment ID: ${ticket.paymentId}` : ''}
            >
              {ticket.paymentStatus === 'Paid' ? '₹100 Paid' : '₹100 Due'}
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-700 mb-3">{ticket.description}</p>
      {ticket.adminComment && (
  <p className="text-indigo-600 text-sm mt-2 mb-3">
    💬 Admin note: {ticket.adminComment}
  </p>
)}

      <div className="flex justify-between items-center text-sm">
        <span className={`px-2 py-1 rounded-full ${getStatusColor(ticket.status)}`}>
          {ticket.status}
        </span>
        <span className="text-gray-500">
          {ticket.createdAt?.seconds
            ? format(new Date(ticket.createdAt.seconds * 1000), 'dd MMM yyyy, h:mm a')
            : '—'}
        </span>
      </div>

    
      <div className="mt-4 flex justify-end space-x-2">
        {isAdmin ? (
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-4 rounded text-sm"
            onClick={() => alert('TODO: Resolve/Assign Logic')}
          >
            Resolve / Assign
          </button>
        ) : (
          <>
            <button
             type="button"
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-1.5 px-4 rounded text-sm"
              onClick={() => onModify(ticket)}
            >
              Modify
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded text-sm"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this ticket?")) {
                  onDelete(ticket.id);
                }
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

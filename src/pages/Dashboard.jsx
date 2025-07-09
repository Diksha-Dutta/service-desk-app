import { Link } from 'react-router-dom';
import { FaTicketAlt, FaTasks, FaShieldAlt } from 'react-icons/fa'; 

export default function Dashboard({ user }) {
  const isLoggedIn = !!user;

  return (
    <div className="text-center mt-20 px-4">
      <h1 className="text-4xl font-bold mb-4 text-indigo-700">Service Desk App 🛠️</h1>
      <p className="text-lg mb-10 text-gray-700">
        Submit tickets, track issues, and get fast support – all in one place.
      </p>

      {!isLoggedIn ? (
        <div className="flex justify-center gap-6">
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-indigo-600 px-5 py-2 rounded hover:bg-indigo-100 transition"
          >
            Register
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">🚀 Explore Our Features</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
            <FeatureCard
              icon={<FaTicketAlt size={32} />}
              title="Raise a Ticket"
              desc="Facing an issue? Submit a ticket and our support team will jump right in."
              link="/"
            />
            <FeatureCard
              icon={<FaTasks size={32} />}
              title="Track Your Tickets"
              desc="View status updates, progress, and history of your raised tickets."
              link="/my-tickets"
            />
            <FeatureCard
              icon={<FaShieldAlt size={32} />}
              title="Priority Support"
              desc="Choose high priority for urgent support with a small fee of ₹100."
              link="/"
            />
          </div>
        </>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, desc, link }) {
  return (
    <Link
      to={link}
      className="border rounded-xl p-6 hover:shadow-lg transition bg-white text-left"
    >
      <div className="mb-4 text-indigo-600">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </Link>
  );
}

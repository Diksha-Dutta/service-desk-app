import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const login = async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      alert('Login failed ❌: ' + err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
      <form onSubmit={login} className="space-y-4">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2" placeholder="Email" required />
        <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="w-full border p-2" placeholder="Password" required />
        <button className="bg-indigo-600 text-white py-2 px-4 rounded w-full">Login</button>
      </form>
      <p className="mt-4 text-sm text-center">
        Don't have an account?{' '}
        <button onClick={() => navigate('/register')} className="text-indigo-600 underline">Sign up</button>
      </p>
    </div>
  );
}

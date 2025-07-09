import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();

  const register = async e => {
    e.preventDefault();

    if (pass !== confirm) {
      alert("Passwords don't match ❌");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, pass);
          navigate('/');
    } catch (err) {
      alert('Registration failed 💥: ' + err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-center mb-4">Create an Account</h2>
      <form onSubmit={register} className="space-y-4">
        <input
          type="email"
          className="w-full border p-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border p-2"
          placeholder="Password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border p-2"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white py-2 px-4 rounded w-full">
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Already have an account?{' '}
        <button onClick={() => navigate('/login')} className="text-indigo-600 underline">Log in</button>
      </p>
    </div>
  );
}

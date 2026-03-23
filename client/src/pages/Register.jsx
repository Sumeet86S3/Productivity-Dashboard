import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.7),_rgba(15,23,42,0.94))] flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-slate-900/70 p-8 shadow-[0_20px_60px_-20px_rgba(14,165,233,0.6)] backdrop-blur-xl">
        <h1 className="text-3xl font-extrabold mb-4">Create account</h1>
        {error && <div className="mb-3 rounded-xl border border-red-400 bg-red-500/20 p-3">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-slate-800/70 px-4 py-3 text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-slate-800/70 px-4 py-3 text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.01] hover:brightness-110"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-300">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

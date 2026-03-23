import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/tasks', label: 'Tasks' },
    { to: '/notes', label: 'Notes' },
    { to: '/goals', label: 'Goals' },
  ];

  return (
    <aside className="h-full w-full max-w-xs p-4 bg-slate-900/90 text-white shadow-2xl backdrop-blur-xl border-r border-white/10 md:w-72">
      <div className="mb-6 rounded-xl border border-white/15 bg-slate-950/40 p-4">
        <div className="text-2xl font-bold tracking-tight">⚡ Productivity</div>
        <div className="text-xs uppercase tracking-wider text-slate-300">Your mission control</div>
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            to={link.to}
            key={link.to}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg'
                  : 'text-slate-200 hover:bg-slate-700/70 hover:text-white'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={logout}
        className="mt-6 w-full rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;

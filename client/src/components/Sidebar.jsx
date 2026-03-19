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
    <div className="h-full p-4 bg-slate-900 text-white w-64 space-y-4">
      <div>
        <div className="text-xl font-bold">Productivity</div>
        <div className="text-xs text-slate-300">Personal dashboard</div>
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            to={link.to}
            key={link.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm ${
                isActive ? 'bg-indigo-500 text-white' : 'text-slate-200 hover:bg-slate-700'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={logout}
        className="mt-4 w-full px-3 py-2 rounded-md bg-red-500 hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

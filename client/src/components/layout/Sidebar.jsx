import { FilePlus2, FileText, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard', label: 'My Contracts', icon: FileText },
  { to: '/create', label: 'Create New', icon: FilePlus2 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white p-4 lg:block">
      <div className="mb-8 px-3">
        <p className="text-xs uppercase tracking-wider text-slate-500">Workspace</p>
        <h2 className="text-xl font-semibold">LexAI</h2>
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-8 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </aside>
  );
};

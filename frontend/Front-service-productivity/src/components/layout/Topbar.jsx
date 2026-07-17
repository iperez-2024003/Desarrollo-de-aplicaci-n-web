import { useAuthStore } from '../../store/auth.store.js';
import { LogoutIcon } from '../ui/Icons.jsx';

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuthStore();

  const initials = (user?.name || 'Usuario')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/80 px-4 py-3 backdrop-blur lg:px-8">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Abrir menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
        </svg>
      </button>

      <div className="hidden lg:block">
        <p className="text-sm text-slate-400">Panel de metricas personales</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-700">
            {user?.name || 'Usuario'}
          </p>
          <p className="text-xs text-slate-400">{user?.email || ''}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
          {initials}
        </div>
        <button
          onClick={logout}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          title="Cerrar sesion"
          aria-label="Cerrar sesion"
        >
          <LogoutIcon />
        </button>
      </div>
    </header>
  );
}

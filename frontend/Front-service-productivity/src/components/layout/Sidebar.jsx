import { NavLink } from 'react-router-dom';
import {
  LogoIcon,
  DashboardIcon,
  CheckIcon,
  ClockIcon,
  AlertIcon,
  FlagIcon,
} from '../ui/Icons.jsx';

const navItems = [
  { to: '/', label: 'Resumen', icon: DashboardIcon, end: true },
  { to: '/completadas', label: 'Completado', icon: CheckIcon },
  { to: '/pendientes', label: 'Pendientes', icon: ClockIcon },
  { to: '/vencidas', label: 'Vencidas', icon: AlertIcon },
  { to: '/prioridades', label: 'Prioridades', icon: FlagIcon },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Fondo oscuro en moviles */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-slate-900/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-brand-600 text-white transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <LogoIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Productividad</p>
            <p className="text-xs text-brand-100">Gestion de Tareas</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-brand-100 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-5 text-xs text-brand-100">
          Fundacion Kinal
        </div>
      </aside>
    </>
  );
}

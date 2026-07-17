import { LockIcon } from '../components/ui/Icons.jsx';

// Pantalla mostrada cuando no existe una sesion activa.
// La autenticacion es responsabilidad del modulo service-auth.
export default function NoSession() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-slate-50 to-brand-100 p-4">
      <div className="card max-w-md text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
          <LockIcon className="h-7 w-7" />
        </div>
        <h1 className="text-xl font-bold text-slate-800">Sesion no iniciada</h1>
        <p className="mt-2 text-sm text-slate-500">
          Para consultar tus metricas de productividad necesitas iniciar sesion
          desde el modulo de autenticacion del sistema.
        </p>
        <p className="mt-4 text-xs text-slate-400">
          Una vez autenticado, el panel se cargara automaticamente.
        </p>
      </div>
    </div>
  );
}

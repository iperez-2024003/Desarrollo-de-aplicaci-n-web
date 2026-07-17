import Spinner from './Spinner.jsx';

// Muestra estados de carga, error o vacio de forma consistente.
export function LoadingState({ message = 'Cargando informacion...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400">
      <Spinner className="h-8 w-8 text-brand-500" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="card flex flex-col items-center gap-3 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-700">
        {message || 'Ocurrio un error al cargar los datos'}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary mt-1">
          Reintentar
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title = 'Sin resultados', message }) {
  return (
    <div className="card flex flex-col items-center gap-2 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M8 12h8" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      {message && <p className="text-sm text-slate-400">{message}</p>}
    </div>
  );
}

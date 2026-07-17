import { RefreshIcon } from './Icons.jsx';
import Spinner from './Spinner.jsx';

// Encabezado reutilizable con titulo, descripcion y boton de recarga.
export default function PageHeader({ title, subtitle, onRefresh, loading }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>

      {onRefresh && (
        <button
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
        >
          {loading ? (
            <Spinner className="h-4 w-4 text-brand-600" />
          ) : (
            <RefreshIcon />
          )}
          Actualizar
        </button>
      )}
    </div>
  );
}

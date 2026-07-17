import { getPrioritySummary } from '../services/productivity.service.js';
import { useFetch } from '../hooks/useFetch.js';
import PageHeader from '../components/ui/PageHeader.jsx';
import Badge from '../components/ui/Badge.jsx';
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from '../components/ui/StateMessage.jsx';
import {
  ETIQUETAS_PRIORIDAD,
  COLORES_PRIORIDAD,
} from '../utils/constants.js';

// Vista de la funcion getPrioritySummary del servicio.
// Endpoint: GET /api/v1/productivity/priority-summary
// Respuesta: [ { priority, total, completed, pending, overdue } ]
export default function Prioridades() {
  const { data, loading, error, reload } = useFetch(getPrioritySummary);
  const summary = data || [];

  return (
    <div>
      <PageHeader
        title="Resumen por prioridad"
        subtitle="Distribucion de tus tareas segun su nivel de prioridad."
        onRefresh={reload}
        loading={loading}
      />

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && summary.length === 0 && (
        <EmptyState
          title="Sin datos de prioridad"
          message="Aun no hay tareas registradas para resumir."
        />
      )}

      {!loading && !error && summary.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summary.map((item) => (
            <PriorityCard key={item.priority} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function PriorityCard({ item }) {
  const color =
    COLORES_PRIORIDAD[item.priority] || COLORES_PRIORIDAD.sin_prioridad;
  const label = ETIQUETAS_PRIORIDAD[item.priority] || item.priority;
  const progress =
    item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;

  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between">
        <Badge className={color}>{label}</Badge>
        <span className="text-2xl font-bold text-slate-800">{item.total}</span>
      </div>

      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <dl className="space-y-2 text-sm">
        <Row label="Completadas" value={item.completed} tone="text-emerald-600" />
        <Row label="Pendientes" value={item.pending} tone="text-amber-600" />
        <Row label="Vencidas" value={item.overdue} tone="text-red-600" />
      </dl>
    </div>
  );
}

function Row({ label, value, tone }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className={`font-semibold ${tone}`}>{value}</dd>
    </div>
  );
}

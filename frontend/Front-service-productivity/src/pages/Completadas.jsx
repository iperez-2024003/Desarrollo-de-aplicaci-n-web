import { getCompletedPercentage } from '../services/productivity.service.js';
import { useFetch } from '../hooks/useFetch.js';
import PageHeader from '../components/ui/PageHeader.jsx';
import ProgressRing from '../components/ui/ProgressRing.jsx';
import { LoadingState, ErrorState } from '../components/ui/StateMessage.jsx';
import { CheckIcon, ClockIcon, DashboardIcon } from '../components/ui/Icons.jsx';

// Vista de la funcion getCompletedPercentage del servicio.
// Endpoint: GET /api/v1/productivity/completed-percentage
export default function Completadas() {
  const { data, loading, error, reload } = useFetch(getCompletedPercentage);

  return (
    <div>
      <PageHeader
        title="Porcentaje completado"
        subtitle="Proporcion de tareas finalizadas sobre el total."
        onRefresh={reload}
        loading={loading}
      />

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && data && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card flex items-center justify-center py-10 lg:col-span-1">
            <ProgressRing value={data.percentage} />
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1 xl:grid-cols-3">
            <SummaryTile
              icon={DashboardIcon}
              label="Total de tareas"
              value={data.total}
              tone="bg-brand-50 text-brand-600"
            />
            <SummaryTile
              icon={CheckIcon}
              label="Completadas"
              value={data.completed}
              tone="bg-emerald-50 text-emerald-600"
            />
            <SummaryTile
              icon={ClockIcon}
              label="Restantes"
              value={data.total - data.completed}
              tone="bg-amber-50 text-amber-600"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryTile({ icon: Icon, label, value, tone }) {
  return (
    <div className="card flex items-center gap-4">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${tone}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
}

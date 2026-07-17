import { getDashboard } from '../services/productivity.service.js';
import { useFetch } from '../hooks/useFetch.js';
import PageHeader from '../components/ui/PageHeader.jsx';
import StatCard from '../components/ui/StatCard.jsx';
import ProgressRing from '../components/ui/ProgressRing.jsx';
import BreakdownBar from '../components/productivity/BreakdownBar.jsx';
import { LoadingState, ErrorState } from '../components/ui/StateMessage.jsx';
import {
  DashboardIcon,
  CheckIcon,
  ClockIcon,
  AlertIcon,
} from '../components/ui/Icons.jsx';
import { ETIQUETAS_ESTADO, ETIQUETAS_PRIORIDAD } from '../utils/constants.js';

// Vista de la funcion getDashboard del servicio.
// Endpoint: GET /api/v1/productivity/dashboard
export default function Dashboard() {
  const { data, loading, error, reload } = useFetch(getDashboard);

  return (
    <div>
      <PageHeader
        title="Resumen de productividad"
        subtitle="Vision general del estado de todas tus tareas."
        onRefresh={reload}
        loading={loading}
      />

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && data && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={DashboardIcon}
              label="Total de tareas"
              value={data.total}
              tone="bg-brand-50 text-brand-600"
            />
            <StatCard
              icon={CheckIcon}
              label="Completadas"
              value={data.completed}
              tone="bg-emerald-50 text-emerald-600"
            />
            <StatCard
              icon={ClockIcon}
              label="Pendientes"
              value={data.pending}
              tone="bg-amber-50 text-amber-600"
            />
            <StatCard
              icon={AlertIcon}
              label="Vencidas"
              value={data.overdue}
              tone="bg-red-50 text-red-600"
              hint="Sin completar y fuera de fecha"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card flex flex-col items-center justify-center gap-3 lg:col-span-1">
              <ProgressRing value={data.completionPercentage} />
              <p className="text-sm text-slate-500">
                {data.completed} de {data.total} tareas completadas
              </p>
            </div>

            <div className="card lg:col-span-1">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">
                Desglose por estado
              </h3>
              <div className="space-y-4">
                {Object.entries(data.statusBreakdown).map(([estado, value]) => (
                  <BreakdownBar
                    key={estado}
                    label={ETIQUETAS_ESTADO[estado] || estado}
                    value={value}
                    total={data.total}
                    colorClass={ESTADO_BAR[estado] || 'bg-slate-400'}
                  />
                ))}
              </div>
            </div>

            <div className="card lg:col-span-1">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">
                Desglose por prioridad
              </h3>
              <div className="space-y-4">
                {Object.entries(data.priorityBreakdown).length === 0 && (
                  <p className="text-sm text-slate-400">
                    Sin datos de prioridad.
                  </p>
                )}
                {Object.entries(data.priorityBreakdown).map(([prio, value]) => (
                  <BreakdownBar
                    key={prio}
                    label={ETIQUETAS_PRIORIDAD[prio] || prio}
                    value={value}
                    total={data.total}
                    colorClass={PRIORIDAD_BAR[prio] || 'bg-slate-400'}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ESTADO_BAR = {
  pendiente: 'bg-amber-500',
  en_progreso: 'bg-brand-500',
  completada: 'bg-emerald-500',
  cancelada: 'bg-slate-400',
};

const PRIORIDAD_BAR = {
  baja: 'bg-slate-400',
  media: 'bg-sky-500',
  alta: 'bg-orange-500',
  critica: 'bg-red-500',
  sin_prioridad: 'bg-slate-300',
};

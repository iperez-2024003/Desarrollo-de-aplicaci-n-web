import { getPendingTasks } from '../services/productivity.service.js';
import { useFetch } from '../hooks/useFetch.js';
import PageHeader from '../components/ui/PageHeader.jsx';
import TaskCard from '../components/productivity/TaskCard.jsx';
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from '../components/ui/StateMessage.jsx';

// Vista de la funcion getPendingTasks del servicio.
// Endpoint: GET /api/v1/productivity/pending
export default function Pendientes() {
  const { data, loading, error, reload } = useFetch(getPendingTasks);
  const tasks = data || [];

  return (
    <div>
      <PageHeader
        title="Tareas pendientes"
        subtitle="Tareas en estado pendiente o en progreso."
        onRefresh={reload}
        loading={loading}
      />

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && tasks.length === 0 && (
        <EmptyState
          title="No hay tareas pendientes"
          message="Todas tus tareas estan completadas o canceladas."
        />
      )}

      {!loading && !error && tasks.length > 0 && (
        <>
          <p className="mb-4 text-sm text-slate-500">
            {tasks.length} tarea{tasks.length !== 1 ? 's' : ''} por completar
          </p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task._id || task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

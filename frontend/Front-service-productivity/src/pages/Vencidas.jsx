import { getOverdueTasks } from '../services/productivity.service.js';
import { useFetch } from '../hooks/useFetch.js';
import PageHeader from '../components/ui/PageHeader.jsx';
import TaskCard from '../components/productivity/TaskCard.jsx';
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from '../components/ui/StateMessage.jsx';
import { AlertIcon } from '../components/ui/Icons.jsx';

// Vista de la funcion getOverdueTasks del servicio.
// Endpoint: GET /api/v1/productivity/overdue
export default function Vencidas() {
  const { data, loading, error, reload } = useFetch(getOverdueTasks);
  const tasks = data || [];

  return (
    <div>
      <PageHeader
        title="Tareas vencidas"
        subtitle="Tareas sin completar cuya fecha limite ya paso."
        onRefresh={reload}
        loading={loading}
      />

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && tasks.length === 0 && (
        <EmptyState
          title="Sin tareas vencidas"
          message="No tienes tareas fuera de fecha. Buen trabajo."
        />
      )}

      {!loading && !error && tasks.length > 0 && (
        <>
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertIcon className="h-5 w-5" />
            <span>
              Tienes <strong>{tasks.length}</strong> tarea
              {tasks.length !== 1 ? 's' : ''} vencida
              {tasks.length !== 1 ? 's' : ''} que requieren atencion.
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task._id || task.id} task={task} overdue />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

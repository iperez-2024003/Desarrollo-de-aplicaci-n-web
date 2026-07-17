import Badge from '../ui/Badge.jsx';
import { CalendarIcon } from '../ui/Icons.jsx';
import { formatDate, daysFromNow } from '../../utils/format.js';
import {
  ETIQUETAS_ESTADO,
  ETIQUETAS_PRIORIDAD,
  COLORES_ESTADO,
  COLORES_PRIORIDAD,
} from '../../utils/constants.js';

// Tarjeta que representa una tarea individual.
// overdue = resalta la fecha en rojo (usado en la vista de vencidas).
export default function TaskCard({ task, overdue = false }) {
  const priority = task.priority || 'sin_prioridad';
  const dias = daysFromNow(task.dueDate);

  return (
    <div className="card transition hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge className={COLORES_PRIORIDAD[priority] || COLORES_PRIORIDAD.sin_prioridad}>
          {ETIQUETAS_PRIORIDAD[priority] || priority}
        </Badge>
        <Badge className={COLORES_ESTADO[task.status] || 'bg-slate-100 text-slate-600'}>
          {ETIQUETAS_ESTADO[task.status] || task.status}
        </Badge>
      </div>

      <h3 className="font-semibold text-slate-800">{task.title}</h3>
      {task.description && (
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {task.description}
        </p>
      )}

      <div
        className={`mt-4 inline-flex items-center gap-1.5 text-xs font-medium ${
          overdue ? 'text-red-600' : 'text-slate-400'
        }`}
      >
        <CalendarIcon />
        <span>{formatDate(task.dueDate)}</span>
        {overdue && dias !== null && (
          <span className="ml-1 rounded-full bg-red-50 px-2 py-0.5 text-red-600">
            {Math.abs(dias)} d de retraso
          </span>
        )}
      </div>
    </div>
  );
}

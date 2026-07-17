import { productivityApi } from '../config/axios.js';

// Cada funcion consume un endpoint del microservicio service-productivity.
// Base: /api/v1/productivity  (todas las rutas requieren JWT)
// El backend responde con la forma { ok: true, data: ... }

// GET /completed-percentage -> { total, completed, percentage }
export const getCompletedPercentage = async () => {
  const { data } = await productivityApi.get('/productivity/completed-percentage');
  return data.data;
};

// GET /pending -> [ tareas pendientes o en progreso ]
export const getPendingTasks = async () => {
  const { data } = await productivityApi.get('/productivity/pending');
  return data.data;
};

// GET /overdue -> [ tareas vencidas ]
export const getOverdueTasks = async () => {
  const { data } = await productivityApi.get('/productivity/overdue');
  return data.data;
};

// GET /priority-summary -> [ { priority, total, completed, pending, overdue } ]
export const getPrioritySummary = async () => {
  const { data } = await productivityApi.get('/productivity/priority-summary');
  return data.data;
};

// GET /dashboard -> { total, completed, pending, cancelled, overdue,
//                     completionPercentage, statusBreakdown, priorityBreakdown }
export const getDashboard = async () => {
  const { data } = await productivityApi.get('/productivity/dashboard');
  return data.data;
};

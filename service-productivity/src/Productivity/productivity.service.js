import { getTasksByUser } from './taskClient.js';
import { ESTADOS, VALORES_PRIORIDAD } from '../../utils/constants.js';

export const calculateCompletedPercentage = async (userId, token) => {
  const tasks = await getTasksByUser(userId, token);

  if (tasks.length === 0) {
    return {
      total: 0,
      completed: 0,
      percentage: 0,
    };
  }

  const completed = tasks.filter((t) => t.status === ESTADOS.COMPLETADA).length;

  return {
    total: tasks.length,
    completed,
    percentage: Math.round((completed / tasks.length) * 100 * 100) / 100,
  };
};

export const getPendingTasks = async (userId, token) => {
  const tasks = await getTasksByUser(userId, token);

  return tasks.filter(
    (t) => t.status === ESTADOS.PENDIENTE || t.status === ESTADOS.EN_PROGRESO
  );
};

export const getOverdueTasks = async (userId, token) => {
  const tasks = await getTasksByUser(userId, token);
  const now = new Date();

  return tasks.filter((t) => {
    if (!t.dueDate) return false;
    if ([ESTADOS.COMPLETADA, ESTADOS.CANCELADA].includes(t.status)) return false;
    return new Date(t.dueDate) < now;
  });
};

export const getPrioritySummary = async (userId, token) => {
  const tasks = await getTasksByUser(userId, token);

  const summary = {};

  for (const task of tasks) {
    const priority = task.priority || 'sin_prioridad';
    if (!summary[priority]) {
      summary[priority] = {
        priority,
        total: 0,
        completed: 0,
        pending: 0,
        overdue: 0,
      };
    }
    summary[priority].total++;

    if (task.status === ESTADOS.COMPLETADA) {
      summary[priority].completed++;
    } else {
      summary[priority].pending++;
    }

    const now = new Date();
    if (task.dueDate && new Date(task.dueDate) < now && task.status !== ESTADOS.COMPLETADA && task.status !== ESTADOS.CANCELADA) {
      summary[priority].overdue++;
    }
  }

  return Object.values(summary).sort(
    (a, b) => (VALORES_PRIORIDAD[b.priority] || 0) - (VALORES_PRIORIDAD[a.priority] || 0)
  );
};

export const getDashboard = async (userId, token) => {
  const tasks = await getTasksByUser(userId, token);
  const now = new Date();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === ESTADOS.COMPLETADA).length;
  const pending = tasks.filter(
    (t) => t.status === ESTADOS.PENDIENTE || t.status === ESTADOS.EN_PROGRESO
  ).length;
  const cancelled = tasks.filter((t) => t.status === ESTADOS.CANCELADA).length;

  const overdue = tasks.filter((t) => {
    if (!t.dueDate) return false;
    if ([ESTADOS.COMPLETADA, ESTADOS.CANCELADA].includes(t.status)) return false;
    return new Date(t.dueDate) < now;
  }).length;

  const percentage = total > 0 ? Math.round((completed / total) * 100 * 100) / 100 : 0;

  const statusBreakdown = {
    pendiente: tasks.filter((t) => t.status === ESTADOS.PENDIENTE).length,
    en_progreso: tasks.filter((t) => t.status === ESTADOS.EN_PROGRESO).length,
    completada: completed,
    cancelada: cancelled,
  };

  const priorityBreakdown = {};
  for (const task of tasks) {
    const p = task.priority || 'sin_prioridad';
    priorityBreakdown[p] = (priorityBreakdown[p] || 0) + 1;
  }

  return {
    total,
    completed,
    pending,
    cancelled,
    overdue,
    completionPercentage: percentage,
    statusBreakdown,
    priorityBreakdown,
  };
};

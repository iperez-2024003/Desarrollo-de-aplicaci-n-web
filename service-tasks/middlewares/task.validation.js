import { PRIORIDADES, ESTADOS, TRANSICIONES_ESTADO } from '../utils/constants.js';

const VALID_PRIORITIES = Object.values(PRIORIDADES);
const VALID_STATUSES = Object.values(ESTADOS);

const isString = (v) => typeof v === 'string' && v.trim().length > 0;
const isValidPriority = (v) => VALID_PRIORITIES.includes(v);
const isValidStatus = (v) => VALID_STATUSES.includes(v);
const isValidDate = (v) => v === undefined || v === null || (!isNaN(new Date(v).getTime()));

export const validateCreate = (data) => {
  const errors = [];

  if (!isString(data.title)) {
    errors.push('El título es obligatorio y debe ser un texto válido');
  }
  if (!isString(data.description)) {
    errors.push('La descripción es obligatoria y debe ser un texto válido');
  }
  if (data.priority && !isValidPriority(data.priority)) {
    errors.push(`Prioridad inválida. Valores permitidos: ${VALID_PRIORITIES.join(', ')}`);
  }
  if (data.status && !isValidStatus(data.status)) {
    errors.push(`Estado inválido. Valores permitidos: ${VALID_STATUSES.join(', ')}`);
  }
  if (data.dueDate && !isValidDate(data.dueDate)) {
    errors.push('La fecha límite no es una fecha válida');
  }
  if (data.dueDate && new Date(data.dueDate) < new Date()) {
    errors.push('La fecha límite no puede ser anterior a la fecha actual');
  }

  return { valid: errors.length === 0, errors };
};

export const validateUpdate = (data) => {
  const errors = [];
  const allowedFields = ['title', 'description', 'priority', 'dueDate', 'owner'];

  const keys = Object.keys(data);
  for (const key of keys) {
    if (!allowedFields.includes(key)) {
      errors.push(`El campo "${key}" no puede ser modificado. Usa el endpoint específico de cambio de estado`);
    }
  }

  if (data.title !== undefined && !isString(data.title)) {
    errors.push('El título debe ser un texto válido');
  }
  if (data.description !== undefined && !isString(data.description)) {
    errors.push('La descripción debe ser un texto válido');
  }
  if (data.priority !== undefined && !isValidPriority(data.priority)) {
    errors.push(`Prioridad inválida. Valores permitidos: ${VALID_PRIORITIES.join(', ')}`);
  }
  if (data.dueDate !== undefined && !isValidDate(data.dueDate)) {
    errors.push('La fecha límite no es una fecha válida');
  }

  return { valid: errors.length === 0, errors };
};

export const validateStatusChange = (currentStatus, newStatus) => {
  const errors = [];

  if (!isValidStatus(currentStatus)) {
    errors.push(`Estado actual inválido: ${currentStatus}`);
    return { valid: false, errors };
  }
  if (!isValidStatus(newStatus)) {
    errors.push(`Nuevo estado inválido. Valores permitidos: ${VALID_STATUSES.join(', ')}`);
    return { valid: false, errors };
  }

  const allowedTransitions = TRANSICIONES_ESTADO[currentStatus];
  if (!allowedTransitions.includes(newStatus)) {
    errors.push(
      `Transición inválida: de "${currentStatus}" a "${newStatus}". ` +
      `Transiciones permitidas: ${allowedTransitions.join(', ') || 'ninguna'}`
    );
  }

  return { valid: errors.length === 0, errors };
};

export const validateFilters = (query) => {
  const errors = [];
  const filters = {};

  if (query.title) {
    filters.title = { $regex: query.title.trim(), $options: 'i' };
  }
  if (query.status) {
    if (!isValidStatus(query.status)) {
      errors.push(`Estado inválido para filtro. Valores: ${VALID_STATUSES.join(', ')}`);
    } else {
      filters.status = query.status;
    }
  }
  if (query.priority) {
    if (!isValidPriority(query.priority)) {
      errors.push(`Prioridad inválida para filtro. Valores: ${VALID_PRIORITIES.join(', ')}`);
    } else {
      filters.priority = query.priority;
    }
  }
  if (query.dueDateFrom || query.dueDateTo) {
    filters.dueDate = {};
    if (query.dueDateFrom) {
      if (!isValidDate(query.dueDateFrom)) {
        errors.push('dueDateFrom no es una fecha válida');
      } else {
        filters.dueDate.$gte = new Date(query.dueDateFrom);
      }
    }
    if (query.dueDateTo) {
      if (!isValidDate(query.dueDateTo)) {
        errors.push('dueDateTo no es una fecha válida');
      } else {
        filters.dueDate.$lte = new Date(query.dueDateTo);
      }
    }
    if (Object.keys(filters.dueDate).length === 0) {
      delete filters.dueDate;
    }
  }
  if (query.owner) {
    filters.owner = query.owner;
  }

  return { valid: errors.length === 0, errors, filters };
};

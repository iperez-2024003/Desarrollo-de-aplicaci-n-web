import axios from 'axios';
import { logger } from '../../utils/logger.js';

const SERVICE_TASKS_URL = process.env.SERVICE_TASKS_URL || 'http://localhost:3000';

const tasksClient = axios.create({
  baseURL: `${SERVICE_TASKS_URL}/api/v1/tasks`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasksByUser = async (userId, token) => {
  try {
    const response = await tasksClient.get('/', {
      headers: {
        'x-token': token,
      },
      params: {
        limit: 1000,
      },
    });
    return response.data.data || [];
  } catch (error) {
    logger.error('Error al obtener tareas del Servicio A', {
      userId,
      error: error.message,
    });
    throw error;
  }
};

export const getTaskById = async (taskId, token) => {
  try {
    const response = await tasksClient.get(`/${taskId}`, {
      headers: {
        'x-token': token,
      },
    });
    return response.data.data;
  } catch (error) {
    logger.error('Error al obtener tarea del Servicio A', {
      taskId,
      error: error.message,
    });
    throw error;
  }
};

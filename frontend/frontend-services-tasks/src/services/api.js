import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token JWT si está disponible
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mapeo de valores entre frontend y backend
const PRIORITY_MAP = {
  low: 'baja',
  medium: 'media',
  high: 'alta',
};

const REVERSE_PRIORITY_MAP = {
  baja: 'low',
  media: 'medium',
  alta: 'alta',
  critica: 'high',
};

const STATUS_MAP = {
  pending: 'pendiente',
  in_progress: 'en_progreso',
  completed: 'completada',
};

const REVERSE_STATUS_MAP = {
  pendiente: 'pending',
  en_progreso: 'in_progress',
  completada: 'completed',
  cancelada: 'completed',
};

// Transformar tarea de backend a formato frontend
const transformTaskFromBackend = (task) => ({
  id: task._id,
  title: task.title,
  description: task.description,
  priority: REVERSE_PRIORITY_MAP[task.priority] || 'medium',
  status: REVERSE_STATUS_MAP[task.status] || 'pending',
  dueDate: task.dueDate,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
});

// Transformar tarea de frontend a formato backend
const transformTaskToBackend = (task) => ({
  title: task.title,
  description: task.description,
  priority: PRIORITY_MAP[task.priority] || 'media',
  dueDate: task.dueDate,
});

export const taskAPI = {
  // Obtener todas las tareas
  getTasks: async (filters = {}) => {
    const params = {};
    if (filters.status) params.status = STATUS_MAP[filters.status];
    if (filters.priority) params.priority = PRIORITY_MAP[filters.priority];
    if (filters.search) params.title = filters.search;
    
    const response = await api.get('/tasks', { params });
    return {
      tasks: response.data.data.tasks.map(transformTaskFromBackend),
      total: response.data.data.total,
    };
  },

  // Crear tarea
  createTask: async (taskData) => {
    const backendData = transformTaskToBackend(taskData);
    const response = await api.post('/tasks', backendData);
    return transformTaskFromBackend(response.data.data);
  },

  // Actualizar tarea
  updateTask: async (taskId, taskData) => {
    const backendData = transformTaskToBackend(taskData);
    const response = await api.put(`/tasks/${taskId}`, backendData);
    return transformTaskFromBackend(response.data.data);
  },

  // Cambiar estado de tarea
  changeStatus: async (taskId, newStatus) => {
    const backendStatus = STATUS_MAP[newStatus];
    const response = await api.patch(`/tasks/${taskId}/status`, { status: backendStatus });
    return transformTaskFromBackend(response.data.data);
  },

  // Eliminar tarea
  deleteTask: async (taskId) => {
    await api.delete(`/tasks/${taskId}`);
  },
};

export default api;

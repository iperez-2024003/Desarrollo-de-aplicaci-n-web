import React, { createContext, useContext, useState, useEffect } from 'react';
import { taskAPI } from '../services/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Cargar tareas desde el backend
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = {};
      if (filterStatus !== 'all') filters.status = filterStatus;
      if (filterPriority !== 'all') filters.priority = filterPriority;
      if (searchTerm) filters.search = searchTerm;

      const { tasks: fetchedTasks } = await taskAPI.getTasks(filters);
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Error al cargar tareas');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar tareas al montar y cuando cambian los filtros
  useEffect(() => {
    fetchTasks();
  }, [filterStatus, filterPriority, searchTerm]);

  // Crear tarea
  const createTask = async (taskData) => {
    try {
      const newTask = await taskAPI.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      setError('Error al crear tarea');
      console.error('Error creating task:', err);
      throw err;
    }
  };

  // Actualizar tarea
  const updateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await taskAPI.updateTask(taskId, taskData);
      setTasks((prev) => prev.map((task) => (task.id === taskId ? updatedTask : task)));
      return updatedTask;
    } catch (err) {
      setError('Error al actualizar tarea');
      console.error('Error updating task:', err);
      throw err;
    }
  };

  // Cambiar estado de tarea
  const moveTask = async (taskId, newStatus) => {
    try {
      const updatedTask = await taskAPI.changeStatus(taskId, newStatus);
      setTasks((prev) => prev.map((task) => (task.id === taskId ? updatedTask : task)));
      return updatedTask;
    } catch (err) {
      setError('Error al cambiar estado de tarea');
      console.error('Error moving task:', err);
      throw err;
    }
  };

  // Eliminar tarea
  const deleteTask = async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      setError('Error al eliminar tarea');
      console.error('Error deleting task:', err);
      throw err;
    }
  };

  const value = {
    tasks,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    createTask,
    updateTask,
    moveTask,
    deleteTask,
    refetchTasks: fetchTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

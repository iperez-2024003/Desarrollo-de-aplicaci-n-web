import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskDetailModal = ({ task, isOpen, onClose, onEdit }) => {
  const { moveTask, deleteTask } = useTasks();
  const [localStatus, setLocalStatus] = useState(task?.status || 'pending');

  if (!isOpen || !task) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'low':
        return 'bg-green-100 text-green-600 border-green-200';
      default:
        return 'bg-blue-100 text-blue-600 border-blue-200';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return priority;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'in_progress':
        return 'En Proceso';
      case 'completed':
        return 'Completada';
      default:
        return status;
    }
  };

  const handleStatusChange = (newStatus) => {
    setLocalStatus(newStatus);
    moveTask(task.id, newStatus);
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      deleteTask(task.id);
      onClose();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-200">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                  {getPriorityLabel(task.priority)}
                </span>
                {isOverdue && (
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-600 border border-red-200">
                    Vencida
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Descripción</h3>
              <p className="text-gray-800 leading-relaxed">{task.description}</p>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#f1f5f9] rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Fecha Límite
                </div>
                <p className={`text-gray-800 font-medium ${isOverdue ? 'text-red-500' : ''}`}>
                  {formatDate(task.dueDate)}
                </p>
              </div>
              <div className="bg-[#f1f5f9] rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Creada
                </div>
                <p className="text-gray-800 font-medium">{formatDate(task.createdAt)}</p>
              </div>
            </div>

            {/* Status Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-3">Estado</h3>
              <div className="flex bg-[#f1f5f9] rounded-lg p-1 border border-gray-200">
                {[
                  { value: 'pending', label: 'Pendiente', color: 'hover:bg-blue-100' },
                  { value: 'in_progress', label: 'En Proceso', color: 'hover:bg-orange-100' },
                  { value: 'completed', label: 'Completada', color: 'hover:bg-green-100' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleStatusChange(option.value)}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      localStatus === option.value
                        ? 'bg-white text-gray-800 shadow-sm'
                        : `text-gray-500 ${option.color}`
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-[#f1f5f9]/50">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-100 border border-red-200 rounded-lg text-red-600 hover:bg-red-200 transition-all duration-200 font-medium"
            >
              Eliminar Tarea
            </button>
            <button
              onClick={() => onEdit(task)}
              className="px-4 py-2 bg-[#3b82f6] border border-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all duration-200 font-medium shadow-lg shadow-blue-500/30"
            >
              Editar Detalles
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetailModal;

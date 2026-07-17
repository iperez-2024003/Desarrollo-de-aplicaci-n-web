import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const CreateTaskPanel = ({ isOpen, onClose }) => {
  const { createTask } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    dueDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.dueDate) return;

    createTask(formData);
    onClose();
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      dueDate: '',
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l border-gray-200 z-50 animate-slide-in shadow-2xl">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Nueva Tarea</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Título *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Escribe el título de la tarea"
                className="w-full px-4 py-3 bg-[#f1f5f9] border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Descripción *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe los detalles de la tarea"
                rows={4}
                className="w-full px-4 py-3 bg-[#f1f5f9] border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200 resize-none"
                required
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Prioridad
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-3 bg-[#f1f5f9] border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200 cursor-pointer"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Estado Inicial
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-[#f1f5f9] border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200 cursor-pointer"
              >
                <option value="pending">Pendiente</option>
                <option value="in_progress">En Proceso</option>
                <option value="completed">Completada</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Fecha Límite *
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-3 bg-[#f1f5f9] border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200 cursor-pointer"
                required
              />
            </div>
          </form>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-[#f1f5f9] border border-gray-200 rounded-lg text-gray-800 hover:bg-gray-200 transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-[#3b82f6] border border-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/30 font-medium"
            >
              Crear Tarea
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTaskPanel;

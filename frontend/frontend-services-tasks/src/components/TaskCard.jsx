import React from 'react';

const TaskCard = ({ task, onClick }) => {
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

  const getProgressWidth = (status) => {
    switch (status) {
      case 'pending':
        return 'w-1/4';
      case 'in_progress':
        return 'w-1/2';
      case 'completed':
        return 'w-full';
      default:
        return 'w-1/4';
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div
      onClick={() => onClick(task)}
      className="group bg-white border border-gray-100 rounded-2xl p-5 cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all duration-200 animate-scale-in shadow-sm"
    >
      {/* Priority Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
          {getPriorityLabel(task.priority)}
        </span>
        {isOverdue && (
          <span className="text-xs text-red-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Vencida
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-gray-800 font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
        {task.title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
        {task.description}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 w-full bg-gray-100 rounded-full">
          <div className={`bg-blue-500 h-2 rounded-full ${getProgressWidth(task.status)}`} />
        </div>
      </div>

      {/* Due Date */}
      <div className="flex items-center gap-2 text-gray-400 text-xs">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className={isOverdue ? 'text-red-500' : ''}>
          {formatDate(task.dueDate)}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;

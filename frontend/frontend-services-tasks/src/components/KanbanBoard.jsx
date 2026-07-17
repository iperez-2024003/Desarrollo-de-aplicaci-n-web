import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from './TaskCard';

const KanbanBoard = ({ onTaskClick }) => {
  const { tasks, loading } = useTasks();

  const columns = [
    { id: 'pending', title: 'Pendiente', color: 'border-l-4 border-l-neon-teal' },
    { id: 'in_progress', title: 'En Proceso', color: 'border-l-4 border-l-neon-orange' },
    { id: 'completed', title: 'Completada', color: 'border-l-4 border-l-neon-green' },
  ];

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 overflow-x-auto">
        <div className="bg-[#f8fafc] rounded-[2rem] border border-gray-100 p-8">
          <h1 className="font-extrabold text-[#1e293b] text-3xl tracking-wide mb-8">
            MIS TAREAS
          </h1>
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">Cargando tareas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-x-auto">
      {/* Main Container */}
      <div className="bg-[#f8fafc] rounded-[2rem] border border-gray-100 p-8">
        {/* Title */}
        <h1 className="font-extrabold text-[#1e293b] text-3xl tracking-wide mb-8">
          MIS TAREAS
        </h1>

        {/* Kanban Columns */}
        <div className="flex gap-6 h-full min-w-max">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            
            return (
              <div key={column.id} className="flex-1 min-w-[320px] max-w-[400px] flex flex-col">
                {/* Column Header */}
                <div className={`flex items-center justify-between mb-4 pb-3 border-b border-gray-200 ${column.color}`}>
                  <h2 className="text-gray-800 font-semibold text-lg">{column.title}</h2>
                  <span className="px-2 py-1 bg-white rounded-full text-gray-500 text-sm border border-gray-200">
                    {columnTasks.length}
                  </span>
                </div>

                {/* Column Content */}
                <div className="flex-1 overflow-y-auto scrollbar-thin space-y-3 pb-4">
                  {columnTasks.length === 0 ? (
                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-200 rounded-2xl">
                      <p className="text-gray-400 text-sm">Sin tareas</p>
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <TaskCard key={task.id} task={task} onClick={onTaskClick} />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;

import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import CreateTaskPanel from './components/CreateTaskPanel';
import TaskDetailModal from './components/TaskDetailModal';
import EditTaskPanel from './components/EditTaskPanel';

function App() {
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

  const handleOpenCreatePanel = () => {
    setIsCreatePanelOpen(true);
  };

  const handleCloseCreatePanel = () => {
    setIsCreatePanelOpen(false);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTask(null);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(false);
    setIsEditPanelOpen(true);
  };

  const handleCloseEditPanel = () => {
    setIsEditPanelOpen(false);
    setSelectedTask(null);
  };

  return (
    <TaskProvider>
      <div className="flex h-screen bg-white">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onOpenCreateTask={handleOpenCreatePanel} />
          
          <KanbanBoard onTaskClick={handleTaskClick} />
        </div>

        <CreateTaskPanel
          isOpen={isCreatePanelOpen}
          onClose={handleCloseCreatePanel}
        />

        <TaskDetailModal
          task={selectedTask}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          onEdit={handleEditTask}
        />

        <EditTaskPanel
          task={selectedTask}
          isOpen={isEditPanelOpen}
          onClose={handleCloseEditPanel}
        />
      </div>
    </TaskProvider>
  );
}

export default App;

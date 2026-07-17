import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Completadas from './pages/Completadas.jsx';
import Pendientes from './pages/Pendientes.jsx';
import Vencidas from './pages/Vencidas.jsx';
import Prioridades from './pages/Prioridades.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/completadas" element={<Completadas />} />
          <Route path="/pendientes" element={<Pendientes />} />
          <Route path="/vencidas" element={<Vencidas />} />
          <Route path="/prioridades" element={<Prioridades />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

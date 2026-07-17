import { Outlet } from 'react-router-dom';
import { useSessionStore } from '../../store/session.store.js';
import NoSession from '../../pages/NoSession.jsx';

// Protege las rutas privadas. Si no hay token de sesion, muestra un aviso.
// El inicio de sesion se realiza en el modulo de autenticacion (service-auth),
// no en este frontend.
export default function ProtectedRoute() {
  const { hasSession } = useSessionStore();

  if (!hasSession()) {
    return <NoSession />;
  }

  return <Outlet />;
}

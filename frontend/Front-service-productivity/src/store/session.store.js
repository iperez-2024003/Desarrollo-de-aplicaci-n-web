import { create } from 'zustand';
import { getToken, getUser } from '../utils/storage.js';

// Store de sesion de solo lectura.
// El inicio de sesion NO es responsabilidad de este frontend: lo gestiona el
// modulo de autenticacion (service-auth). Aqui solo se consume el token JWT que
// ya haya sido almacenado (localStorage compartido o VITE_DEV_TOKEN en desarrollo).
export const useSessionStore = create((set) => ({
  token: getToken(),
  user: getUser(),

  hasSession: () => Boolean(getToken()),

  // Vuelve a leer la sesion desde el almacenamiento (util tras un cambio externo).
  refresh: () => set({ token: getToken(), user: getUser() }),
}));

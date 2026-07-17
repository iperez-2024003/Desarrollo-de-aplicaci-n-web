import { create } from 'zustand';
import * as authService from '../services/auth.service.js';
import {
  getToken,
  getUser,
  setToken,
  setUser,
  clearSession,
} from '../utils/storage.js';

// Store global de autenticacion con Zustand.
// Rehidrata la sesion desde localStorage al iniciar la app.
export const useAuthStore = create((set) => ({
  token: getToken(),
  user: getUser(),
  loading: false,
  error: null,

  isAuthenticated: () => Boolean(getToken()),

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login(email, password);

      if (!data?.token) {
        throw new Error('El servidor no devolvio un token valido');
      }

      setToken(data.token);
      setUser(data.userDetails || null);
      set({ token: data.token, user: data.userDetails || null, loading: false });
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'No se pudo iniciar sesion';
      set({ loading: false, error: message });
      return false;
    }
  },

  logout: () => {
    clearSession();
    set({ token: null, user: null, error: null });
  },

  clearError: () => set({ error: null }),
}));

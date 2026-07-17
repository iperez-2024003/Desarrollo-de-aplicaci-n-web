import { create } from 'zustand';
import { loginRequest, registerRequest } from '../services/authService';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const data = await loginRequest({ email, password });

      set({
        user: data.userDetails,
        token: data.token,
        isLoading: false,
      });

      localStorage.setItem('token', data.token);

      return data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  register: async ({ name, email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const data = await registerRequest({ name, email, password });

      set({ isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));

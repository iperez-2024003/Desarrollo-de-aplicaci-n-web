import axios from 'axios';
import { getToken, clearSession } from '../utils/storage.js';

const AUTH_API_URL =
  import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001/api/v1';

const PRODUCTIVITY_API_URL =
  import.meta.env.VITE_PRODUCTIVITY_API_URL || 'http://localhost:3002/api/v1';

// Cliente para el servicio de autenticacion (login / registro)
export const authApi = axios.create({
  baseURL: AUTH_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Cliente para el servicio de productividad (rutas protegidas por JWT)
export const productivityApi = axios.create({
  baseURL: PRODUCTIVITY_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Inyecta el token JWT en cada peticion al servicio de productividad.
// El backend acepta el token en la cabecera "x-token".
productivityApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

// Si el token expira o es invalido (401), se cierra la sesion.
productivityApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearSession();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

import axios from 'axios';
import { getToken, clearSession } from '../utils/storage.js';

const PRODUCTIVITY_API_URL =
  import.meta.env.VITE_PRODUCTIVITY_API_URL || 'http://localhost:3002/api/v1';

// Cliente para el servicio de productividad (rutas protegidas por JWT).
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

// Si el token expira o es invalido (401), se limpia la sesion almacenada.
// La reautenticacion es responsabilidad del modulo de autenticacion.
productivityApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearSession();
    }
    return Promise.reject(error);
  }
);

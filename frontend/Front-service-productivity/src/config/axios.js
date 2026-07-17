import axios from 'axios';
import { getToken } from '../utils/storage.js';

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

// Si el token expira o es invalido, el backend responde 401. La reautenticacion
// es responsabilidad del modulo de autenticacion (service-auth), por lo que aqui
// solo se propaga el error para que la vista lo muestre; no se toca el token.
productivityApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

import { authApi } from '../config/axios.js';

// Consume POST /api/v1/auth/login del microservicio service-auth.
// Respuesta esperada: { success, token, userDetails, expiresAt }
export const login = async (email, password) => {
  const { data } = await authApi.post('/auth/login', { email, password });
  return data;
};

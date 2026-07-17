// Utilidad centralizada para leer la sesion del navegador.
// El token es emitido por el modulo de autenticacion (service-auth) y compartido
// mediante localStorage. En desarrollo se admite un token via VITE_DEV_TOKEN
// para poder probar este frontend de forma aislada.

const TOKEN_KEY = 'gt_productivity_token';
const USER_KEY = 'gt_productivity_user';

export const getToken = () =>
  localStorage.getItem(TOKEN_KEY) || import.meta.env.VITE_DEV_TOKEN || null;

export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

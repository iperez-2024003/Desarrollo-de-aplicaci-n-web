// Utilidad para leer la sesion del navegador.
//
// El token JWT lo emite y almacena el frontend de autenticacion (service-auth),
// que lo guarda en localStorage bajo la clave 'token'. Este frontend NO inicia
// sesion: solo reutiliza ese mismo token para autorizar sus peticiones al
// servicio de productividad.
//
// En desarrollo aislado se admite un token via VITE_DEV_TOKEN.

// IMPORTANTE: debe coincidir con la clave usada por el frontend de auth.
const TOKEN_KEY = 'token';

export const getToken = () =>
  localStorage.getItem(TOKEN_KEY) || import.meta.env.VITE_DEV_TOKEN || null;

// Decodifica el payload del JWT (sin verificar la firma) para mostrar datos
// basicos del usuario. El servicio de productividad valida el token; aqui solo
// se lee informacion no sensible como el id (sub) y el rol.
export const getTokenPayload = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(escape(atob(base64))));
  } catch {
    return null;
  }
};

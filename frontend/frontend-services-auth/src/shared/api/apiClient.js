const AUTH_SERVICE_URL =
  import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:3001/api/v1';

export const apiClient = async (path, options = {}) => {
  const response = await fetch(`${AUTH_SERVICE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Ocurrió un error en la solicitud');
    error.status = response.status;
    error.code = data.code;
    throw error;
  }

  return data;
};

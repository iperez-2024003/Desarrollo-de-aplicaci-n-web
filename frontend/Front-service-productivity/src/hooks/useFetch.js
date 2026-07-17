import { useCallback, useEffect, useState } from 'react';

// Hook generico para consumir un servicio asincrono.
// Devuelve datos, estados de carga/error y una funcion para recargar.
export function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'No se pudo obtener la informacion';
      setError(message);
    } finally {
      setLoading(false);
    }
    // fetcher se asume estable (definido a nivel de modulo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}

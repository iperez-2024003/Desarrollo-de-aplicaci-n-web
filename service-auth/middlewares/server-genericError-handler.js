import { randomUUID } from 'crypto';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, _next) => {
  console.error('Error:', err);
  const traceId = err.traceId || randomUUID();
  const timestamp = new Date().toISOString();
  const errorCode = err.errorCode || null;

  if (err.name === 'ValidationError' || err.name === 'SequelizeValidationError') {
    const errors = err.errors?.map((e) => ({ field: e.path || e.field, message: e.message })) || [];
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: errors.length ? errors : undefined,
      errorCode,
      traceId,
      timestamp,
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors?.[0]?.path || 'campo';
    return res.status(409).json({
      success: false,
      message: `El valor de ${field} ya está en uso`,
      errorCode,
      traceId,
      timestamp,
    });
  }

  if (err.name === 'SequelizeDatabaseError' && /invalid|uuid|syntax/i.test(err.message || '')) {
    return res.status(400).json({
      success: false,
      message: 'ID o parámetro con formato inválido',
      errorCode,
      traceId,
      timestamp,
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token inválido',
      errorCode,
      traceId,
      timestamp,
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expirado',
      errorCode,
      traceId,
      timestamp,
    });
  }

  if (err.name === 'SequelizeConnectionError') {
    return res.status(503).json({
      success: false,
      message: 'Error de conexión a la base de datos',
      errorCode,
      traceId,
      timestamp,
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message || 'Error del servidor',
      errorCode: err.errorCode || null,
      traceId,
      timestamp,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    errorCode,
    traceId,
    timestamp,
  });
};

export const notFound = (req, res) => {
  const traceId = randomUUID();
  const timestamp = new Date().toISOString();
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`,
    errorCode: null,
    traceId,
    timestamp,
  });
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

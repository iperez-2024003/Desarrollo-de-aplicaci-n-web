export const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  return res.status(statusCode).json({
    ok: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

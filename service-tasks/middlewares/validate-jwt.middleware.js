import { verifyJWT } from '../config/jwt.js';

export const validateJWT = async (req, res, next) => {
  try {
    let token =
      req.header('x-token') ||
      req.header('authorization') ||
      req.body?.token ||
      req.query?.token;

    if (!token) {
      return res.status(401).json({
        ok: false,
        error: 'No hay token en la petición',
      });
    }

    token = token.replace(/^Bearer\s+/i, '');

    const decoded = await verifyJWT(token);

    req.userId = decoded.sub;
    req.userRole = decoded.role || 'USER_ROLE';

    next();
  } catch (error) {
    let message = 'Token inválido';

    if (error.name === 'TokenExpiredError') {
      message = 'Token expirado';
    } else if (error.name === 'JsonWebTokenError') {
      message = 'Token inválido';
    }

    return res.status(401).json({
      ok: false,
      error: message,
    });
  }
};

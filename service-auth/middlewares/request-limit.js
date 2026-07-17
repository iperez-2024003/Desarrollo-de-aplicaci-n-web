import rateLimit from 'express-rate-limit';
import { config } from '../configs/config.js';

export const requestLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.',
    retryAfter: 900,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message:
        'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.',
      retryAfter: 900,
    });
  },
});

export const authRateLimit = rateLimit({
  windowMs: config.rateLimit.authWindowMs,
  max: config.rateLimit.authMaxRequests,
  message: {
    success: false,
    message:
      'Demasiados intentos de autenticación, intenta de nuevo más tarde.',
    retryAfter: Math.ceil(config.rateLimit.authWindowMs / 1000),
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.log(`Rate limit exceeded for IP: ${req.ip} on ${req.path}`);
    res.status(429).json({
      success: false,
      message:
        'Demasiados intentos de autenticación, intenta de nuevo más tarde.',
      retryAfter: Math.ceil(config.rateLimit.authWindowMs / 1000),
    });
  },
});

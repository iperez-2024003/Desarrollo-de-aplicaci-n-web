import dotenv from 'dotenv';

dotenv.config();

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 200,
    authWindowMs: 1 * 60 * 1000,
    authMaxRequests: 50,
  },

  security: {
    passwordMinLength: 8,
  },

  app: {
    frontendUrl: process.env.FRONTEND_URL,
  },

  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
      : [],
  },
};

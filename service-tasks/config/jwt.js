import crypto from 'crypto';

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf8');
}

function base64UrlEncode(buf) {
  return buf
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return reject(new Error('Formato de token inválido'));
      }

      const [headerB64, payloadB64, signatureB64] = parts;
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        return reject(new Error('JWT_SECRET no está configurado'));
      }

      const expectedSignature = base64UrlEncode(
        crypto.createHmac('sha256', secret).update(`${headerB64}.${payloadB64}`).digest()
      );

      if (expectedSignature !== signatureB64) {
        return reject(new Error('Firma del token inválida'));
      }

      const payload = JSON.parse(base64UrlDecode(payloadB64));

      if (payload.exp && Date.now() >= payload.exp * 1000) {
        const err = new Error('Token expirado');
        err.name = 'TokenExpiredError';
        return reject(err);
      }

      if (payload.nbf && Date.now() < payload.nbf * 1000) {
        return reject(new Error('Token aún no válido'));
      }

      const issuer = process.env.JWT_ISSUER || 'GestionTareas';
      const audience = process.env.JWT_AUDIENCE || 'GestionTareas-Users';

      if (payload.iss && payload.iss !== issuer) {
        return reject(new Error('Issuer del token inválido'));
      }

      if (payload.aud && payload.aud !== audience) {
        return reject(new Error('Audience del token inválido'));
      }

      resolve(payload);
    } catch (error) {
      const err = new Error('Token inválido');
      err.name = 'JsonWebTokenError';
      reject(err);
    }
  });
};

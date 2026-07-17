import argon2 from 'argon2';
import { config } from '../configs/config.js';

export const hashPassword = async (password) => {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 102400,
      timeCost: 2,
      parallelism: 8,
      hashLength: 32,
      saltLength: 16,
    });
  } catch (error) {
    throw new Error('Error al hashear la contraseña');
  }
};

export const verifyPassword = async (hashedPassword, plainPassword) => {
  try {
    try {
      const result = await argon2.verify(hashedPassword, plainPassword);
      if (result) return true;
    } catch (directError) {
      // fall through
    }

    if (hashedPassword.startsWith('$argon2id$v=19$')) {
      const manualResult = await verifyDotNetHashManually(
        plainPassword,
        hashedPassword
      );
      if (manualResult) return true;
    }

    return false;
  } catch (error) {
    console.error('Password verification error:', error.message);
    return false;
  }
};

const verifyDotNetHashManually = async (password, hashedPassword) => {
  try {
    if (!hashedPassword.startsWith('$argon2id$v=19$')) {
      return false;
    }

    const parts = hashedPassword.split('$');
    if (parts.length !== 6) {
      return false;
    }

    const paramsStr = parts[3];
    const saltB64 = parts[4];
    const expectedHashB64 = parts[5];

    const params = {};
    paramsStr.split(',').forEach((param) => {
      const [key, value] = param.split('=');
      params[key] = parseInt(value);
    });

    const salt = Buffer.from(saltB64, 'base64');
    const expectedHash = Buffer.from(expectedHashB64, 'base64');

    const computedHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: params.m || 102400,
      timeCost: params.t || 2,
      parallelism: params.p || 8,
      salt: salt,
      hashLength: expectedHash.length,
      raw: true,
    });

    const isMatch = (await import('crypto')).default.timingSafeEqual(expectedHash, computedHash);
    return isMatch;
  } catch (error) {
    return false;
  }
};

export const validatePasswordStrength = (password) => {
  const errors = [];

  if (password.length < config.security.passwordMinLength) {
    errors.push(
      `La contraseña debe tener al menos ${config.security.passwordMinLength} caracteres`
    );
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('La contraseña debe tener al menos una letra mayúscula');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('La contraseña debe tener al menos una letra minúscula');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('La contraseña debe tener al menos un número');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

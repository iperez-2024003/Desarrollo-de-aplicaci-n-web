import {
  checkUserExists,
  createNewUser,
  findUserByEmail,
} from './user-db.js';
import { verifyPassword } from '../utils/password-utils.js';
import { buildUserResponse } from '../utils/user-helpers.js';
import { generateJWT } from './generate-jwt.js';

export const registerUserHelper = async (userData) => {
  try {
    const { name, email, password } = userData;

    const userExists = await checkUserExists(email);
    if (userExists) {
      throw new Error('Ya existe un usuario con este correo electrónico');
    }

    const newUser = await createNewUser({
      name,
      email,
      password,
    });

    return {
      success: true,
      user: buildUserResponse(newUser),
      message: 'Usuario registrado exitosamente.',
    };
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

export const loginUserHelper = async (email, password) => {
  try {
    const createLoginError = (message, code) => {
      const error = new Error(message);
      error.code = code;
      return error;
    };

    const user = await findUserByEmail(email);

    if (!user) {
      throw createLoginError('Credenciales inválidas', 'INVALID_CREDENTIALS');
    }

    const isValidPassword = await verifyPassword(user.Password, password);

    if (!isValidPassword) {
      throw createLoginError('Credenciales inválidas', 'INVALID_CREDENTIALS');
    }

    if (!user.Status) {
      throw new Error('Tu cuenta está desactivada. Contacta al administrador.');
    }

    const role = user.UserRoles?.[0]?.Role?.Name || 'USER_ROLE';
    const token = await generateJWT(user.Id.toString(), { role });

    const fullUser = buildUserResponse(user);

    const expiresInMs = (() => {
      const expiresIn = process.env.JWT_EXPIRES_IN || '30m';
      const value = parseInt(expiresIn, 10) || 30;
      if (expiresIn.endsWith('m')) return value * 60 * 1000;
      if (expiresIn.endsWith('h')) return value * 60 * 60 * 1000;
      if (expiresIn.endsWith('d')) return value * 24 * 60 * 60 * 1000;
      return 30 * 60 * 1000;
    })();
    const expiresAt = new Date(Date.now() + expiresInMs);

    return {
      success: true,
      message: 'Login exitoso',
      token,
      userDetails: {
        id: fullUser.id,
        name: fullUser.name,
        email: fullUser.email,
        role: fullUser.role,
      },
      expiresAt,
    };
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

import {
  registerUserHelper,
  loginUserHelper,
} from '../../helpers/auth-operations.js';
import { asyncHandler } from '../../middlewares/server-genericError-handler.js';

export const register = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await registerUserHelper({ name, email, password });
    res.status(201).json(result);
  } catch (error) {
    console.error('Error in register controller:', error);

    let statusCode = 400;
    if (
      error.message.includes('ya existe') ||
      error.message.includes('ya está en uso')
    ) {
      statusCode = 409;
    }

    res.status(statusCode).json({
      success: false,
      message: error.message || 'Error en el registro',
      error: error.message,
    });
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginUserHelper(email, password);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in login controller:', error);

    let statusCode = 401;
    if (
      error.message.includes('bloqueada') ||
      error.message.includes('desactivada')
    ) {
      statusCode = 423;
    } else if (error.code === 'INVALID_CREDENTIALS') {
      statusCode = 401;
    }

    res.status(statusCode).json({
      success: false,
      message: error.message || 'Error en el login',
      code: error.code,
      error: error.message,
    });
  }
});

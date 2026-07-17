import { body, validationResult } from 'express-validator';
import { validatePasswordStrength } from '../utils/password-utils.js';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    });
  }
  next();
};

export const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ max: 50 })
    .withMessage('El nombre no puede tener más de 50 caracteres'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('El correo electrónico es obligatorio')
    .isEmail()
    .withMessage('El correo electrónico no tiene un formato válido')
    .isLength({ max: 150 })
    .withMessage('El correo electrónico no puede tener más de 150 caracteres'),

  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 8, max: 255 })
    .withMessage('La contraseña debe tener entre 8 y 255 caracteres')
    .custom((value) => {
      const { isValid, errors: strengthErrors } = validatePasswordStrength(value);
      if (!isValid) {
        throw new Error(strengthErrors.join('. '));
      }
      return true;
    }),

  handleValidationErrors,
];

export const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El correo electrónico es obligatorio')
    .isEmail()
    .withMessage('Debe proporcionar un email válido'),

  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida'),

  handleValidationErrors,
];

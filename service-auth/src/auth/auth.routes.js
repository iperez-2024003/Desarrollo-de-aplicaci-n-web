import { Router } from 'express';
import * as authController from './auth.controller.js';
import {
  authRateLimit,
} from '../../middlewares/request-limit.js';
import {
  validateRegister,
  validateLogin,
} from '../../middlewares/validation.js';

const router = Router();

router.post(
  '/register',
  authRateLimit,
  validateRegister,
  authController.register
);

router.post(
  '/login',
  authRateLimit,
  validateLogin,
  authController.login
);

export default router;

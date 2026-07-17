import { Router } from 'express';
import * as userController from './user.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';

const router = Router();

router.get('/profile', validateJWT, userController.getProfile);

export default router;

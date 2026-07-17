import { Router } from 'express';
import * as taskController from './task.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.middleware.js';
import { validate } from '../../middlewares/validation.middleware.js';
import { validateCreate, validateUpdate } from '../../middlewares/task.validation.js';

const router = Router();

router.use(validateJWT);

router.post('/', validate(validateCreate), taskController.createTask);

router.get('/', taskController.getTasks);

router.get('/:id', taskController.getTaskById);

router.put('/:id', validate(validateUpdate), taskController.updateTask);

router.patch('/:id/status', taskController.changeStatus);

router.delete('/:id', taskController.deleteTask);

export default router;

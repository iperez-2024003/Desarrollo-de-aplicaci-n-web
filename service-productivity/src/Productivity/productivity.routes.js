import { Router } from 'express';
import * as productivityController from './productivity.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.middleware.js';

const router = Router();

router.use(validateJWT);

router.get('/completed-percentage', productivityController.getCompletedPercentage);

router.get('/pending', productivityController.getPendingTasks);

router.get('/overdue', productivityController.getOverdueTasks);

router.get('/priority-summary', productivityController.getPrioritySummary);

router.get('/dashboard', productivityController.getDashboard);

export default router;

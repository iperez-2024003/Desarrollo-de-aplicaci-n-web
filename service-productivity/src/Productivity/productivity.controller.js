import * as productivityService from './productivity.service.js';
import { success } from '../../helpers/response.helper.js';

export const getCompletedPercentage = async (req, res, next) => {
  try {
    const token = req.header('x-token') || req.header('authorization');
    const data = await productivityService.calculateCompletedPercentage(req.userId, token);
    return success(res, data);
  } catch (error) {
    next(error);
  }
};

export const getPendingTasks = async (req, res, next) => {
  try {
    const token = req.header('x-token') || req.header('authorization');
    const data = await productivityService.getPendingTasks(req.userId, token);
    return success(res, data);
  } catch (error) {
    next(error);
  }
};

export const getOverdueTasks = async (req, res, next) => {
  try {
    const token = req.header('x-token') || req.header('authorization');
    const data = await productivityService.getOverdueTasks(req.userId, token);
    return success(res, data);
  } catch (error) {
    next(error);
  }
};

export const getPrioritySummary = async (req, res, next) => {
  try {
    const token = req.header('x-token') || req.header('authorization');
    const data = await productivityService.getPrioritySummary(req.userId, token);
    return success(res, data);
  } catch (error) {
    next(error);
  }
};

export const getDashboard = async (req, res, next) => {
  try {
    const token = req.header('x-token') || req.header('authorization');
    const data = await productivityService.getDashboard(req.userId, token);
    return success(res, data);
  } catch (error) {
    next(error);
  }
};

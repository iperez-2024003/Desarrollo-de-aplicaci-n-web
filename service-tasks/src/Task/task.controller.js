import Task from './task.model.js';
import { success, created, paginated } from '../../helpers/response.helper.js';
import { validateStatusChange } from '../../middlewares/task.validation.js';

export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const owner = req.userId;

    const task = await Task.create({ title, description, priority, dueDate, owner });

    return created(res, task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const owner = req.userId;
    const { status, priority, title, dueDateFrom, dueDateTo } = req.query;

    const filters = { owner };

    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (title) filters.title = { $regex: title.trim(), $options: 'i' };

    if (dueDateFrom || dueDateTo) {
      filters.dueDate = {};
      if (dueDateFrom) filters.dueDate.$gte = new Date(dueDateFrom);
      if (dueDateTo) filters.dueDate.$lte = new Date(dueDateTo);
    }

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      Task.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Task.countDocuments(filters),
    ]);

    return paginated(res, tasks, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.userId });

    if (!task) {
      return res.status(404).json({
        ok: false,
        error: 'Tarea no encontrada',
      });
    }

    return success(res, task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const allowedFields = ['title', 'description', 'priority', 'dueDate'];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        ok: false,
        error: 'No hay campos válidos para actualizar',
      });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        ok: false,
        error: 'Tarea no encontrada',
      });
    }

    return success(res, task);
  } catch (error) {
    next(error);
  }
};

export const changeStatus = async (req, res, next) => {
  try {
    const { status: newStatus } = req.body;

    const task = await Task.findOne({ _id: req.params.id, owner: req.userId });

    if (!task) {
      return res.status(404).json({
        ok: false,
        error: 'Tarea no encontrada',
      });
    }

    const validation = validateStatusChange(task.status, newStatus);
    if (!validation.valid) {
      return res.status(400).json({
        ok: false,
        error: 'Transición de estado inválida',
        details: validation.errors,
      });
    }

    task.status = newStatus;
    await task.save();

    return success(res, task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.userId });

    if (!task) {
      return res.status(404).json({
        ok: false,
        error: 'Tarea no encontrada',
      });
    }

    return success(res, { message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    next(error);
  }
};

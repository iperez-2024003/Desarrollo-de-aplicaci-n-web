import mongoose from 'mongoose';
import { PRIORIDADES, ESTADOS, VALORES_PRIORIDAD } from '../../utils/constants.js';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
      maxlength: [200, 'El título no puede superar los 200 caracteres'],
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true,
      maxlength: [2000, 'La descripción no puede superar los 2000 caracteres'],
    },
    priority: {
      type: String,
      required: [true, 'La prioridad es obligatoria'],
      enum: {
        values: Object.values(PRIORIDADES),
        message: 'Prioridad inválida: {VALUE}',
      },
      default: PRIORIDADES.MEDIA,
    },
    status: {
      type: String,
      required: [true, 'El estado es obligatorio'],
      enum: {
        values: Object.values(ESTADOS),
        message: 'Estado inválido: {VALUE}',
      },
      default: ESTADOS.PENDIENTE,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    owner: {
      type: String,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

taskSchema.virtual('overdue').get(function () {
  return this.isOverdue();
});

taskSchema.methods.isOverdue = function () {
  if (!this.dueDate) return false;
  if ([ESTADOS.COMPLETADA, ESTADOS.CANCELADA].includes(this.status)) return false;
  return new Date() > this.dueDate;
};

taskSchema.methods.daysUntilDue = function () {
  if (!this.dueDate) return null;
  const now = new Date();
  const diff = this.dueDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

taskSchema.methods.daysSinceAssigned = function () {
  const now = new Date();
  const diff = now.getTime() - this.createdAt.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

taskSchema.methods.priorityValue = function () {
  return VALORES_PRIORIDAD[this.priority] || 0;
};

const Task = mongoose.model('Task', taskSchema);

export default Task;

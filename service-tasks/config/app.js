import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './db.js';
import { errorHandler } from '../middlewares/errorHandler.middleware.js';

import taskRoutes from '../src/Task/task.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_PATH = '/api/v1';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'service-tasks', timestamp: new Date().toISOString() });
});

app.use(`${BASE_PATH}/tasks`, taskRoutes);

app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor de tareas corriendo en puerto ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Tasks API: http://localhost:${PORT}${BASE_PATH}/tasks`);
  });
};

start();

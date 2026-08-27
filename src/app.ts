import { errorHandler } from '@/middlewares';
import {
  attendanceRoutes,
  departmentRoutes,
  employeeRoutes,
  roleRoutes,
  rootRoutes,
  shiftRoutes,
} from '@/routes';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import { ALLOWED_ORIGINS } from './config/general';

const app = express();

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow mobile apps and api test tools.
    if (!origin) return callback(null, true);

    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error(`"${origin}" is not allowed by CORS`));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/', rootRoutes);
app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);
app.use('/roles', roleRoutes);
app.use('/shifts', shiftRoutes);
app.use('/attendances', attendanceRoutes);

app.use(errorHandler);

export default app;

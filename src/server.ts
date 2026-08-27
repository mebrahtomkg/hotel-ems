import './sideEffects'; // Side effects import.

import { testDatabaseConnection } from '@/config/db';
import { createServer } from 'node:http';
import app from './app';
import { PORT } from '@/config/general';

const startServer = async () => {
  // Test database connection before the server starts.
  await testDatabaseConnection();

  // Create server
  const httpServer = createServer(app);

  httpServer.listen(PORT, () => {
    console.log(
      `Hotel Employee Management System backend running on port ${PORT}`,
    );
  });
};

startServer();

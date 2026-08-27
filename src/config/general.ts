import path from 'node:path';
import { fileURLToPath } from 'node:url';

console.log(
  '=============== Hotel Employee Management System ========================',
);

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
console.log('Deployment mode:', IS_PRODUCTION ? 'production' : 'development');

// Get the current file's path using import.meta.url
const __filename = fileURLToPath(import.meta.url);

// Get the current directory's path from the file path
const __dirname = path.dirname(__filename);

// This is just the absolute path of the /server folder
export const ROOT_DIR = path.resolve(__dirname, '../../');
console.log('Server root dir:', ROOT_DIR);

// The port in which the server to listen(run)
export const PORT = 3000;
console.log('Server port:', PORT);

const allowedOrigins =
  process.env.ALLOWED_ORIGINS?.split(',') ||
  (IS_PRODUCTION ? [] : ['http://localhost:8080']);

if (allowedOrigins.length) {
  console.log('Allowed origins:', allowedOrigins.join('  '));
} else {
  console.warn('No allowed origin(s) is/are provided. Browsers maynot work!');
}

export const ALLOWED_ORIGINS = allowedOrigins;

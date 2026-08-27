# Hotel Employee Management System

Backend API for managing hotel employees, their departments, roles, shifts, and attendance. Built to fulfill the Software Developer Technical Challenge requirements.

## Architecture & Tech Stack

The project is built using a modern, scalable Node.js stack:

- **Runtime & Framework:** Node.js (v20+) with Express.js (v5) for handling HTTP requests.

- **Language:** TypeScript for static typing, enhancing code quality and developer experience.

- **ORM:** Sequelize, allowing flexible database management and easy switching between SQLite (for local development/testing) and PostgreSQL (for production).

- **Validation:** Zod for strict schema validation on incoming API requests.

- **Tooling:** SWC for lightning-fast builds, Biome & Prettier for linting and formatting, and TSX for development watching.

- **Structure:** Modular architecture separating routes, controllers, models, schemas, and middlewares (e.g., centralized error handling).

## Database Design

The database schema is designed to properly handle relationships between various entities using Sequelize.

### Entities & Relationships

1. **Employee:** The core entity.

   - Belongs to a **Department** (`departmentId`) - _1-to-Many_ (Set Null on delete)
   - Belongs to a **Role** (`roleId`) - _1-to-Many_ (Set Null on delete)
   - Has many **Shifts** - _1-to-Many_ (Cascade on delete)
   - Has many **Attendances** - _1-to-Many_ (Cascade on delete)

2. **Department:** Represents hotel departments (e.g., Housekeeping, Front Desk).

3. **Role:** Represents job titles (e.g., Manager, Receptionist) and includes an `hourlyRate`.

4. **Shift:** Records scheduled work hours (`startTime`, `endTime`) and notes for an employee.

5. **Attendance:** Tracks actual clock-in and clock-out times, along with a status (e.g., 'PRESENT', 'LATE', 'ABSENT').

_Note: Timestamps (`hireDate`, `startTime`, `endTime`, `clockInTime`, `clockOutTime`) are stored as `BIGINT` (Unix epochs) to avoid timezone parsing issues across different database dialects._

## API Endpoints

The API exposes the following RESTful endpoints:

### Employees

- `GET /employees` - Retrieve all employees with their department and role
- `POST /employees` - Add a new employee (Validates via Zod)
- `PATCH /employees/:id` - Update an existing employee
- `DELETE /employees/:id` - Remove an employee (Cascades to shifts and attendance)

### Other Resources (CRUD)

- `GET /departments`, `POST /departments`, etc.
- `GET /roles`, `POST /roles`, etc.
- `GET /shifts`, `POST /shifts`, etc.
- `GET /attendances`, `POST /attendances`, etc.

## Important Decisions

- **Database Agnosticism:** By using Sequelize and environment variables, the system can run on a zero-config SQLite database out of the box, but can be instantly scaled to PostgreSQL.

- **Cascading Deletes:** Deleting an employee automatically cleans up their associated shifts and attendance records to maintain database integrity without leaving orphaned rows.

- **CORS Management:** Implemented strict CORS policies configurable via environment variables to ensure the API is only accessible from trusted origins.

## How to Run the Project

### 1. Prerequisites

- Node.js (v20.18.1 or higher)
- pnpm (v10.14.0)

### 2. Installation

Clone the repository and install the dependencies:

```bash
pnpm install
```

### 3. Configuration

Create a .env file in the root directory of the project and paste the following configuration. Adjust the values as needed:

```env
# List allowed origins for CORS, comma-separated
# e.g., http://localhost:8080,https://yourdomain.com
ALLOWED_ORIGINS=http://localhost:8080

# Active database dialect. Options: postgres, sqlite
# Default: sqlite
DATABASE_DIALECT=sqlite

# SQLite database directory to store the database file. must be an absolute path.
# Usefull only if DATABASE_DIALECT is sqlite which the default dialect.
# By default the SQLite database file is stored in 'database' folder found
# inside root of this project.
SQLITE_DATABASE_DIR=/path/to/your/directory

# PostgreSQL Database URI
# Required and usefull only if DATABASE_DIALECT is set to 'postgres'
POSTGRES_DATABASE_URI=postgresql://user:password@host:port/database
```

### 4. Running the Application

- First do database Reset:

```bash
pnpm run db:reset
```

- Development Mode:

```bash
pnpm run dev
```

- Production Build:

```bash
pnpm run build
pnpm start
```

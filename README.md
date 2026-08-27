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

### System & Payroll

- `GET /` - Health check route to verify backend status and database connectivity

- `GET /payroll` - Generate payroll report. **This endpoint fulfills the challenge requirement for "one non-trivial query or report that provides useful information."** It uses Sequelize aggregation functions to calculate total hours worked from attendance logs, counts late incidents, and estimates payout by combining this data with the employee's role and hourly rate.

### Employees

- `GET /employees` - Retrieve all employees with their department and role
- `POST /employees` - Add a new employee (Validates via Zod)
- `PATCH /employees/:id` - Update an existing employee
- `DELETE /employees/:id` - Remove an employee (Cascades to shifts and attendance)

### Departments

- `GET /departments` - Retrieve all departments
- `POST /departments` - Add a new department
- `PUT /departments/:id` - Update an existing department
- `DELETE /departments/:id` - Remove a department

### Roles

- `GET /roles` - Retrieve all roles
- `POST /roles` - Add a new role
- `PUT /roles/:id` - Update an existing role
- `DELETE /roles/:id` - Remove a role

### Shifts

- `GET /shifts` - Retrieve all shifts
- `POST /shifts` - Add a new shift
- `PUT /shifts/:id` - Update an existing shift
- `DELETE /shifts/:id` - Remove a shift

### Attendance

- `GET /attendances` - Retrieve all attendance records
- `POST /attendances` - Add a new attendance record
- `PUT /attendances/:id` - Update an existing attendance record
- `DELETE /attendances/:id` - Remove an attendance record

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

### 3. Running the Application

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

### 4. Testing the API with Postman

I have exported a **Postman** collection in a file named `Postman-API-Tests.postman_collection.json` containing all API tests for the endpoints described above. Anyone can simply import this collection into Postman to instantly try out and test the API functionality (CRUD operations for employees, roles, departments, shifts, and attendance).

### 5. Configuration

The app works outof the box with no configuration. But it can be configured for flexibility.
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

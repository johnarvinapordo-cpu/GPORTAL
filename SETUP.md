# CMDI Grade Portal - Database Setup Instructions

## Quick Setup (3 Steps)

### Step 1: Open phpMyAdmin
- Go to http://localhost/phpmyadmin
- Login with your MySQL credentials (default: root / no password)

### Step 2: Create Database
- Click "SQL" tab in phpMyAdmin
- Copy and paste the contents from `server/setup.sql`
- Click "Go" to execute

### Step 3: Start the Server
Open a new terminal and run:
```bash
cd c:/Users/user/.vscode/gPORTAL/GPORTAL
node server/index.js
```

The backend will run on http://localhost:3001

## Alternative: Command Line
If you prefer MySQL command line:
```bash
mysql -u root -p < server/setup.sql
```

## Demo Accounts (Password: demo123)
| User ID | Role | Name |
|---------|------|------|
| STU-001 | Student | Juan Dela Cruz |
| TCH-001 | Teacher | Maria Santos |
| ADM-001 | Admin | Admin User |
| REG-001 | Registrar | Registrar User |
| FIN-001 | Finance | Finance User |

## API Endpoints
- POST /api/login - User authentication
- GET /api/student/:id - Student data
- GET /api/teacher/:id - Teacher data
- GET /api/admin - Admin statistics
- GET /api/registrar - Registrar data
- GET /api/finance - Finance data

## Frontend
The React frontend runs on http://localhost:5173

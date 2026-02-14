# Job Board API

A RESTful backend API for a job application platform built with Node.js, Express, TypeScript, and MongoDB.  
Supports role-based access control (RBAC), job postings, applications, and user management.

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/v1/auth/register` | Register a new user/admin |
| POST   | `/api/v1/auth/login` | Login and receive JWT cookie |
| POST   | `/api/v1/auth/logout` | Clear session cookie |

### Jobs (Admin)
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/v1/jobs` | Create a new job |
| PUT    | `/api/v1/jobs/:id` | Update job details |
| DELETE | `/api/v1/jobs/:id` | Soft-delete a job |
| GET    | `/api/v1/jobs/my-jobs` | Get jobs posted by admin |

### Applications (User)
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/api/v1/jobs` | Get all active jobs |
| POST   | `/api/v1/apply/:jobId` | Apply for a job |
| GET    | `/api/v1/my-applications` | Get user applications |
| DELETE | `/api/v1/withdraw/:id` | Withdraw an application |

---

## Data Models

### User
- `username`: string  
- `email`: string (unique)  
- `password`: string (hashed)  
- `role`: 'user' or 'admin'  

### Job
- `title`, `company`, `level`, `workType`, `hourlyRate`  
- `isActive`, `isDeleted`  
- `postedBy`: ObjectId (ref User)  

### Application
- `job`: ObjectId (ref Job)  
- `user`: ObjectId (ref User)  
- `createdAt`: Date  

---

## Setup and Run

### Prerequisites
- Node.js v16+  
- MongoDB (Atlas or local instance)  

### Installation, .env Setup, and Run
```bash
# Clone the repository
git clone <repo-url>
cd job-board-api

# Install dependencies
npm install

# Create .env file in project root with the following:
echo "PORT=5000" >> .env
echo "MONGO_URI=your_mongodb_connection_string" >> .env
echo "JWT_SECRET=your_secret_key" >> .env

# Build project
npm run build

# Start server
npm start

# For development with hot-reload
npm run dev

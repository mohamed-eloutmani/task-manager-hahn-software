# Task Manager – Full-Stack Application (Hahn Software)

This project is a full-stack Task Management application developed as part of a technical evaluation aligned with **Hahn Software** requirements.  
It allows authenticated users to manage projects and tasks, track task completion, and view project progress.

---

## 🎯 Project Objectives

The goal of this project is to demonstrate:

- Clean backend architecture with Spring Boot
- Secure authentication using JWT
- CRUD operations for Projects and Tasks
- Frontend integration with a REST API
- Data persistence using PostgreSQL
- Dockerized backend and database
- Unit testing of services and authentication logic

---

## ✨ Features

### 🔐 Authentication
- Login with email and password
- JWT-based authentication
- All API routes (except login) are protected
- Passwords stored securely (encoded)

### 📁 Project Management
- Create a project (title + description)
- List projects of the authenticated user
- View project details
- Delete a project

### ✅ Task Management
- Create tasks inside a project
- Update task details
- Mark tasks as completed
- Delete tasks
- List tasks by project
- List all tasks belonging to the authenticated user

### 📊 Project Progress
For each project:
- Total number of tasks
- Number of completed tasks
- Progress percentage

---

## 🧱 Architecture Overview

The backend follows a **layered and clean architecture**:

- **Controller layer**: REST API endpoints
- **Service layer**: Business logic (interfaces + implementations)
- **Repository layer**: Data access using JPA
- **DTO & Mapper layer**: Data transfer and mapping
- **Security layer**: JWT authentication & authorization
- **Exception handling**: Centralized error handling
- **Testing layer**: Unit tests using Mockito

The frontend communicates with the backend via REST APIs and manages authentication tokens.

---

## 📂 Project Structure

task-manager
├── taskmanager - backend
│ ├── src
│ ├── pom.xml
│ ├── Dockerfile
│ ├── docker-compose.yml
│ └── src/test
│
├── taskmanager-frontend
│ ├── src
│ ├── package.json
│ ├── vite.config.ts
│ └── public
│
└── README.md



---

## 🛠️ Technologies Used

### Backend
- Java 17
- Spring Boot
- Spring Security
- JWT (JSON Web Token)
- JPA / Hibernate
- PostgreSQL
- Maven
- Docker & Docker Compose

### Frontend
- React
- Vite
- TypeScript
- Axios

### Testing
- JUnit 5
- Mockito

### Tools
- Git & GitHub
- Docker
- Postman

---

## 🐳 Docker & Database Setup

The backend and PostgreSQL database are fully **Dockerized**.

### ▶️ Run Backend + Database with Docker

From the backend folder:

```bash
cd taskmanager - backend
docker-compose up --build

This will:
Start PostgreSQL
Start the Spring Boot backend
Automatically connect the backend to the database
Backend API will be available at:
http://localhost:8085

🚀 Run Frontend
Prerequisites
Node.js (v16+)
npm

🔐 Authentication Flow
User logs in using email and password
Backend validates credentials
JWT token is generated and returned
Frontend stores the token
Token is sent in the Authorization header for protected API calls
📡 Main API Endpoints
Method	Endpoint	Description
POST	/auth/login	Authenticate user
GET	/api/projects	List user projects
POST	/api/projects	Create project
GET	/api/projects/{id}	Get project details
DELETE	/api/projects/{id}	Delete project
GET	/api/projects/{id}/progress	Project progress
GET	/api/tasks	List all user tasks
GET	/api/tasks/project/{id}	List project tasks
POST	/api/tasks/project/{id}	Create task
PUT	/api/tasks/{id}	Update task
DELETE	/api/tasks/{id}	Delete task
🧪 Testing
Unit tests are implemented for:
Authentication service
Project service
Task service
User service
Tests are written using JUnit 5 and Mockito, without loading the Spring context.

👤 Author
Mohamed El Outmani
Full-Stack Developer – Java / Spring Boot / React
GitHub: https://github.com/mohamed-eloutmani
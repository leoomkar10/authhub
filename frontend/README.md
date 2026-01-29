🚀 AuthHub – Dockerized Full Stack Authentication System

AuthHub is a full-stack authentication system built with React (Vite), Node.js (Express), and MySQL, fully containerized using Docker & Docker Compose.
It supports user registration, login, JWT authentication, and protected profile access.

This project demonstrates real-world backend architecture, environment configuration, containerization, and service orchestration.

📌 Features

User Registration

User Login

Password Hashing (bcrypt)

JWT Authentication

Protected Profile API

MySQL Database Integration

Dockerized Frontend, Backend & Database

Persistent Database Storage using Docker Volumes

🏗 Tech Stack
Frontend

React (Vite)

Axios

CSS

Backend

Node.js

Express.js

MySQL2

bcryptjs

jsonwebtoken

dotenv

DevOps

Docker

Docker Compose

📁 Project Structure
authhub/
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   ├── db.js
│   └── middleware/
│
├── docker-compose.yml
└── README.md

⚙️ Environment Variables

Create a .env file inside backend/

DB_HOST=mysql
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=authhub
JWT_SECRET=mysecretkey

🐳 Run Project with Docker

From root folder:

docker compose up --build

🌐 Application URLs

Frontend:

http://localhost:5173


Backend:

http://localhost:5000

🗄 Database Tables

Run inside MySQL container:

docker exec -it authub-mysql-1 mysql -u root -p


Then:

USE authhub;


Create tables:

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255)
);

CREATE TABLE user_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  address VARCHAR(255),
  phone VARCHAR(50),
  bio TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

🔐 API Endpoints
Register
POST /api/auth/register

Login
POST /api/auth/login

Profile (Protected)
GET /api/user/profile
Header: Authorization: Bearer <token>

📦 Docker Architecture
Frontend Container  → React App
Backend Container   → Express API
MySQL Container     → Database
Volume              → MySQL Data Persistence

💡 What This Project Demonstrates

Full stack development

Secure authentication

Backend API design

Docker containerization

Multi-container orchestration

Environment variable management

Production-style setup

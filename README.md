# 🔐 AuthHub - Cloud-Native Authentication System

**AuthHub** is a full-stack authentication system that provides user registration and login functionality, deployed on AWS using cloud-native services. The project demonstrates containerization, cloud deployment, and integration of frontend, backend, load balancer, and managed database.

This project follows a production-style architecture using **AWS ECS**, **Application Load Balancer**, and **RDS**.

[![AWS](https://img.shields.io/badge/AWS-Cloud-orange)](https://aws.amazon.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue)](https://www.docker.com/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933)](https://nodejs.org/)

---

## 🔗 Live Architecture

```
React (S3) → Application Load Balancer → ECS (Docker Backend) → RDS (MySQL)
```

---

## 📋 Table of Contents

- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Architecture Explanation](#-architecture-explanation)
- [AWS Services Overview](#-aws-services-overview)
- [Security Design](#-security-design)
- [Setup Instructions](#-setup-instructions)
- [Environment Variables](#-environment-variables)

---

## 🏛 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Internet Users                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   AWS S3 Bucket │
                    │  (React Frontend)│
                    │  Static Hosting  │
                    └────────┬─────────┘
                             │
                             │ API Requests
                             ▼
                    ┌─────────────────┐
                    │  Application    │
                    │  Load Balancer  │
                    │      (ALB)      │
                    └────────┬─────────┘
                             │
                             │ Route Traffic
                             ▼
                    ┌─────────────────┐
                    │   AWS ECS       │
                    │  (Fargate)      │
                    │                 │
                    │  ┌───────────┐  │
                    │  │  Docker   │  │
                    │  │ Container │  │
                    │  │ (Node.js) │  │
                    │  └───────────┘  │
                    └────────┬─────────┘
                             │
                             │ Database Query
                             ▼
                    ┌─────────────────┐
                    │   AWS RDS       │
                    │    (MySQL)      │
                    │  Database       │
                    └─────────────────┘
```

---

## 🧰 Tech Stack

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **Vite** - Next-generation frontend tooling
- **Hosted on AWS S3** - Static website hosting

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **JWT Authentication** - Token-based authentication
- **Docker** - Containerization platform

### Cloud & DevOps
- **AWS ECS (Fargate)** - Container orchestration service
- **AWS ECR** - Docker container registry
- **AWS Application Load Balancer** - Traffic distribution
- **AWS RDS (MySQL)** - Managed relational database
- **AWS S3** - Object storage and static hosting

---

## ✨ Features

✅ **User Registration** - New users can create accounts  
✅ **User Login** - Secure authentication with JWT  
✅ **Password Hashing** - Secure password storage using bcrypt  
✅ **JWT-based Authentication** - Stateless authentication mechanism  
✅ **Cloud Hosted Frontend** - Scalable static hosting on S3  
✅ **Containerized Backend** - Docker containers for consistency  
✅ **Managed MySQL Database** - AWS RDS for reliability  
✅ **Load Balanced Architecture** - High availability with ALB  

---

## 🏗 Architecture Explanation

### Flow of Operations

1. **React frontend** is built using `npm run build` and uploaded to an **S3 bucket**
2. Users access the frontend using the **S3 website endpoint**
3. Frontend sends API requests to an **Application Load Balancer (ALB)**
4. ALB forwards traffic to **ECS service**
5. ECS runs **Docker containers** pulled from **Amazon ECR**
6. Backend container connects to **MySQL database** hosted on **AWS RDS**
7. RDS stores user credentials and authentication data

### Design Benefits

- ✅ **No Hardcoded IPs** - ALB provides a stable DNS endpoint
- ✅ **Scalability** - ECS can auto-scale based on demand
- ✅ **Reliability** - AWS managed services provide high availability
- ✅ **Security** - Multiple layers of security isolation

---

## 🖼 AWS Services Overview

### 1. Amazon RDS (MySQL Database)

![AWS RDS Screenshot](./screenshots/Screenshot_2026-01-30_102742.png)

**Configuration:**
- **Database:** `authhub-database`
- **Engine:** MySQL Compatible
- **Status:** Available ✅
- **Role:** Instance
- **Upgrade Order:** SECOND
- **Region:** ap-south-1a
- **Size:** db.t3.micro

The RDS instance stores all user authentication data including hashed passwords and user information.

---

### 2. Amazon ECS (Elastic Container Service)

![AWS ECS Screenshot](./screenshots/Screenshot_2026-01-30_102816.png)

**Configuration:**
- **Cluster:** `authhub_ecs_demo`
- **Services:** 1
- **Tasks:** 0 Pending | 1 Running ✅
- **Container Instances:** 0 EC2
- **CloudWatch Monitoring:** Default

ECS orchestrates the Docker containers running the Node.js backend application.

---

### 3. Amazon S3 (Frontend Hosting)

![AWS S3 Screenshot](./screenshots/Screenshot_2026-01-30_103021.png)

**Buckets:**
- **authhub-s3** (Primary frontend bucket)
- nikeproject-aws
- omkar-devy
- omkardev-private
- simple-og

**Configuration:**
- **Region:** Asia Pacific (Mumbai) ap-south-1
- **Created:** January 29, 2026
- **Purpose:** Static website hosting for React application

---

### 4. Application Load Balancer (ALB)

![AWS ALB Screenshot](./screenshots/Screenshot_2026-01-30_103048.png)

**Configuration:**
- **Name:** `authhub-alb`
- **State:** Active ✅
- **Type:** Application
- **Scheme:** Internet-facing
- **IP Address Type:** IPv4
- **VPC ID:** vpc-09eeb6c251c996170
- **Availability Zones:** 2 Availability Zones
- **Security Group:** sg-0...

The ALB distributes incoming traffic to ECS tasks and provides a single entry point for API requests.

---

## 🔒 Security Design

### Multi-Layer Security Architecture

```
┌──────────────────────────────────────────────────┐
│  Security Layer 1: Public Access                 │
│  - S3 Bucket (Frontend Only)                     │
└────────────────┬─────────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────────┐
│  Security Layer 2: Load Balancer                 │
│  - ALB with Security Groups                      │
│  - HTTPS/SSL Termination                         │
└────────────────┬─────────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────────┐
│  Security Layer 3: Application Tier              │
│  - ECS Tasks in Private Subnet                   │
│  - Only accessible via ALB                       │
└────────────────┬─────────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────────┐
│  Security Layer 4: Database Tier                 │
│  - RDS in Private Subnet                         │
│  - Only accessible from ECS                      │
└──────────────────────────────────────────────────┘
```

### Security Features

🔐 **Backend Not Publicly Exposed**
- Backend services run in private subnets
- No direct internet access to ECS tasks

🔐 **ALB as Security Gateway**
- Only ALB can communicate with ECS
- Security groups restrict traffic flow

🔐 **Database Isolation**
- Only ECS can communicate with RDS
- RDS in private subnet with no public IP

🔐 **Password Security**
- Passwords stored using bcrypt hashing
- Salted hashing prevents rainbow table attacks

🔐 **Secrets Management**
- Environment variables for sensitive data
- No hardcoded credentials in code

🔐 **JWT Authentication**
- Stateless token-based authentication
- Tokens expire after set duration

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js 16+ installed
- Docker installed
- AWS CLI configured
- AWS Account with appropriate permissions

### Local Development

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/authhub.git
cd authhub
```

#### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
DB_HOST=your-rds-endpoint.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=your-password
DB_NAME=authhub
JWT_SECRET=your-jwt-secret
```

Run backend:

```bash
npm start
```

#### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://your-alb-endpoint.amazonaws.com
```

Run frontend:

```bash
npm run dev
```

---

### AWS Deployment

#### Step 1: Create RDS Database

```bash
aws rds create-db-instance \
    --db-instance-identifier authhub-database \
    --db-instance-class db.t3.micro \
    --engine mysql \
    --master-username admin \
    --master-user-password YourPassword123 \
    --allocated-storage 20
```

#### Step 2: Build and Push Docker Image

```bash
# Build Docker image
docker build -t authhub-backend .

# Tag image
docker tag authhub-backend:latest <account-id>.dkr.ecr.ap-south-1.amazonaws.com/authhub-backend:latest

# Login to ECR
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-south-1.amazonaws.com

# Push to ECR
docker push <account-id>.dkr.ecr.ap-south-1.amazonaws.com/authhub-backend:latest
```

#### Step 3: Create ECS Cluster and Service

```bash
# Create cluster
aws ecs create-cluster --cluster-name authhub_ecs_demo

# Create task definition (task-definition.json)
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create service
aws ecs create-service \
    --cluster authhub_ecs_demo \
    --service-name authhub-service \
    --task-definition authhub-task \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx]}" \
    --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:...,containerName=authhub-container,containerPort=5000"
```

#### Step 4: Deploy Frontend to S3

```bash
# Build frontend
cd frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://authhub-s3 --delete

# Enable static website hosting
aws s3 website s3://authhub-s3 --index-document index.html
```

---

## 🔧 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `DB_HOST` | RDS endpoint | `authhub-database.xxx.rds.amazonaws.com` |
| `DB_USER` | Database username | `admin` |
| `DB_PASSWORD` | Database password | `SecurePass123!` |
| `DB_NAME` | Database name | `authhub` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-key` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API endpoint | `http://authhub-alb-xxx.ap-south-1.elb.amazonaws.com` |

---

## 📊 Project Structure

```
authhub/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── package.json
│   └── .env
├── screenshots/
│   ├── Screenshot_2026-01-30_102742.png (RDS)
│   ├── Screenshot_2026-01-30_102816.png (ECS)
│   ├── Screenshot_2026-01-30_103021.png (S3)
│   └── Screenshot_2026-01-30_103048.png (ALB)
└── README.md
```

---

## 🎯 Key Learnings

- ✅ Containerizing applications with Docker
- ✅ Deploying containers on AWS ECS with Fargate
- ✅ Setting up Application Load Balancers
- ✅ Managing databases with AWS RDS
- ✅ Implementing JWT authentication
- ✅ Securing cloud applications with security groups
- ✅ Hosting static websites on S3
- ✅ Understanding cloud-native architecture patterns

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Cannot connect to RDS**
```
Solution: Check security group allows inbound from ECS security group on port 3306
```

**Issue: ECS tasks failing to start**
```
Solution: Verify ECR image exists and task role has ECR pull permissions
```

**Issue: ALB returns 502 error**
```
Solution: Check ECS tasks are running and health checks are passing
```

**Issue: Frontend cannot reach backend**
```
Solution: Verify CORS settings and API URL in frontend .env

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**⭐ If you found this project helpful, please consider giving it a star!**

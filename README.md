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
<img width="2816" height="1536" alt="Gemini_Generated_Image_t5nm5mt5nm5mt5nm" src="https://github.com/user-attachments/assets/ceca04ce-311b-4433-bf38-76a9baea8d49" />
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

<img width="1915" height="677" alt="Screenshot 2026-01-30 102742" src="https://github.com/user-attachments/assets/ae8309c7-efc6-4ab9-814d-b8b6932d65b6" />

The RDS instance stores all user authentication data including hashed passwords and user information.

---

### 2. Amazon ECS (Elastic Container Service)

<img width="1915" height="748" alt="Screenshot 2026-01-30 102816" src="https://github.com/user-attachments/assets/b3bbb821-795d-4b4b-ac0a-71a15df7a603" />

ECS orchestrates the Docker containers running the Node.js backend application.

---

### 3. Amazon S3 (Frontend Hosting)

<img width="1917" height="645" alt="Screenshot 2026-01-30 103021" src="https://github.com/user-attachments/assets/e4b206fa-08be-4058-8b43-c124f7bbce9b" />

Static website hosting for React application

---

### 4. Application Load Balancer (ALB)

<img width="1918" height="637" alt="Screenshot 2026-01-30 103048" src="https://github.com/user-attachments/assets/a63d09d3-4bf0-41c4-a69b-712acff53eb9" />

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

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**⭐ If you found this project helpful, please consider giving it a star!**

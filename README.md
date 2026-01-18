# Microservices Setup

This project consists of two main microservices: User Service and Product Service, which are Dockerized and can be run using Docker Compose

# Main Features
User Service: Manages user-related operations such as registration, login, and user data management.
Product Service: Handles product-related operations like creating, updating, and deleting products.

# Environment Variables
Both microservices require specific environment variables to be set for proper operation. These variables should be placed in a .env file or set in your environment.

# User Service (/user-service/.env)
MONGO_URI=``
PORT=5000
JWT_SECRET=node_micro_2024
REFRESH_TOKEN_SECRET=node_refresh_micro_2024
BCRYPT_SALT_ROUNDS=12

# Product Service (/product-service/.env)
MONGO_URI=''
PORT=6000
JWT_SECRET=node_micro_2024
ADMIN=1
USER=2

# API Gateway (/api-gateway/.env)
PORT=7000
AUTH_SERVICE_URL=http://localhost:5000/api/auth
PRODUCT_SERVICE_URL=http://localhost:6000/api/product
JWT_SECRET=node_micro_2024

# Setup Instructions
Prerequisites
Make sure you have the following installed:

Docker: For containerization and microservice management. Docker Installation Guide
Docker Compose: To run both services together. Docker Compose Installation Guide
Node.js (v20): For development and testing.
NPM or Yarn: For managing dependencies.

# Installation
1. Clone the repository:
git clone https://github.com/yourusername/project-name.git
cd project-name

2. Install dependencies for each service:
cd user-service
npm install

cd ../product-service
npm install

# Running Services
Running Locally Without Docker:
1. For User Service:
cd user-service
npm run dev

2. For Product Service:
cd product-service
npm run dev

# By default, the services will run on the following ports:

User Service: http://localhost:5000
Product Service: http://localhost:6000
Api Gateway:http://localhost:7000

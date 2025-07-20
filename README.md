# Task Manager App

A **Task Manager API** built with **Node.js**, **Express**, and **MongoDB**.

---

## Features

- **User Authentication**: Register, log in, and manage user sessions with JWT
- **Task Management**: Create, read, update, and delete tasks
- **Password Reset**: Send password reset links and reset passwords securely
- **API Documentation**: Swagger UI for comprehensive API documentation
- **Error Handling**: Centralized error handling for consistent responses
- **Validation**: Input validation using Joi
- **Environment Configuration**: Manage sensitive data with `.env` files

---

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)


---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MonubiJustin/Task-Manager-App.git
   cd Task-Manager-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your environment variables** (see [Environment Variables](#environment-variables))

4. **Start the server:**
   ```bash
   npm start
   ```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
RESEND_API_KEY=your_resend_api_key
BASE_URL=http://localhost:3000
```

---

## Usage

1. **Start the server:**
   ```bash
   npm start
   ```
2. **Access the API:**  
   Visit `http://localhost:3000`

3. **Development (with live reloading):**
   ```bash
   npm install -g nodemon
   nodemon app.js
   ```

---

## API Documentation

- API documentation is available via **Swagger**.
- After starting the server, visit:  
  [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

#### Example Endpoints

- Register a User: `POST /api/v1/users/register`
- Login a User: `POST /api/v1/users/login`
- Get Current User: `GET /api/v1/users/me`
- Create a Task: `POST /api/v1/tasks`
- Get All Tasks: `GET /api/v1/tasks`

---

## Project Structure

```
Task-Manager-App/
├── public/         # Frontend static files
├── routes/         # API route definitions
├── models/         # Mongoose models
├── middleware/     # Custom middleware
├── controller/     # Route handlers (controllers)
├── validators/     # Joi validation schemas
├── startup/        # Initialization logic (e.g., DB, Swagger)
├── app.js          # Main application entry point
├── package.json    # Project metadata and dependencies
└── README.md       # Project documentation
```

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend
- **Express**: Web framework for building RESTful APIs
- **MongoDB**: NoSQL database for storing user and task data
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication and authorization
- **Joi**: Input validation
- **Swagger**: API documentation
- **dotenv**: Environment variable management

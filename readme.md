# Connectverse

Connectverse is a full-stack web application built with a React frontend and an Express backend. The application includes user authentication, password reset functionality, and rate limiting to prevent brute-force attacks.

![alt text](<Screenshot 2025-02-11 124700.png>)
 ![alt text](<Screenshot 2025-02-11 124617.png>)
  ![alt text](<Screenshot 2025-02-11 124643.png>)

## Table of Contents

- Features
- Technologies Used
- Project Structure
- Setup Instructions
  - Backend Setup
  - Frontend Setup
- Usage
- API Endpoints
- License

## Features

- User registration and login
- Password reset via email
- JWT-based authentication
- Rate limiting to prevent brute-force attacks
- Responsive UI with Tailwind CSS

## Technologies Used

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- nodemailer
- dotenv
- express-rate-limit

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Vite

## Project Structure

## Setup Instructions

### Backend Setup

1. **Navigate to the backend directory:**

   ```sh
   cd backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create a `.env` file in the backend directory and add the following environment variables:**

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/
   JWT_SECRET=This is my task
   ```

4. **Start the backend server:**

   ```sh
   npm start
   ```

   The backend server will be running at `http://localhost:3000`.

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```sh
   cd frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the frontend server:**

   ```sh
   npm run dev
   ```
## you can now register a new user, log in, and use the application.

API Endpoints
Authentication Routes
POST /api/auth/signup

Register a new user.

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
POST /api/auth/login
Authenticate user and return JWT token.
{
  "email": "string",
  "password": "string"
}

POST /api/auth/forgot-password
Generate password reset token and send email.
{
  "email": "string"
}

POST /api/auth/reset-password
Verify reset token and update password.
{
  "token": "string",
  "newPassword": "string"
}


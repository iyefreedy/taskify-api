# Taskify API

Taskify API is a RESTful API designed to manage tasks efficiently. This project provides endpoints to create, read, update, and delete tasks, along with user authentication and authorization.

## Features

- **User Authentication**: Secure user registration and login.
- **Task Management**: Create, read, update, and delete tasks.
- **User Authorization**: Ensure users can only access their own tasks.
- **Error Handling**: Comprehensive error responses for invalid requests.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskify-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd taskify-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. Access the API at `http://localhost:5000`.

## Endpoints

- **POST /register**: Register a new user.
- **POST /login**: Authenticate a user.
- **GET /tasks**: Retrieve all tasks for the authenticated user.
- **POST /tasks**: Create a new task.
- **PUT /tasks/:id**: Update an existing task.
- **DELETE /tasks/:id**: Delete a task.

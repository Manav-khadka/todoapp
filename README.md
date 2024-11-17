
# Todo App

This is a simple Todo app that allows users to add, filter, search, and delete tasks. It also includes features like marking tasks as completed, and a dark mode toggle. The app interacts with a backend API for managing tasks.

## Features
- Add a new todo item.
- Filter todos by active, completed, or all.
- Search todos by title.
- Mark todos as completed.
- Delete todos.
- Dark mode toggle.

## Requirements
- Node.js (for running a local server)
- Browser

## API Endpoints
- **GET `/api/todos`** - Fetch all todos.
- **POST `/api/todos`** - Add a new todo.
- **PUT `/api/todos/:id`** - Update a todo (mark as completed).
- **DELETE `/api/todos/:id`** - Delete a todo.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/manav-khadka/todoapp.git
cd todoapp
```

### 2. Install Dependencies
If you need to set up the backend or run your own API server, ensure that it's running. For example, if you're using a Node.js backend with Express:
```bash
npm install
```

### 3. Run the Backend (if applicable)
If you have a backend server (e.g., Node.js), run it locally:
```bash
npm start
```
Your Todo App will live at : http://localhost:3000
and api at http://localhost:3000/api/todos

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend :** Node.js, Express 
- **API:** RESTful API with JSON data
- **LocalStorage** for dark mode preference

### Note: .env is pushed so you can run easily also there is no authentication so you can see others user data as well 
## live lin : https://todoapp-pr5m.onrender.com/ (deployed on render)

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const todoRoutes = require('./src/routes/todo-routes');

// Use routes
app.use('/api/todos', todoRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

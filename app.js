const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./src/routes/todo-routes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/todos', todoRoutes);

module.exports = app;

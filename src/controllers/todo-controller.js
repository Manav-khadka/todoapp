const Todo = require('../models/todo-model');

// Get all todos
exports.getTodos = (req, res) => {
  Todo.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Create a new todo
exports.createTodo = (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  Todo.create(title, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, title, completed: false });
  });
};

// Update a todo
exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  Todo.update(id, completed, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Todo updated successfully' });
  });
};

// Delete a todo
exports.deleteTodo = (req, res) => {
  const { id } = req.params;

  Todo.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Todo deleted successfully' });
  });
};

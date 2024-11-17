const db = require('../config/db');

// Get all todos from the database
exports.getAll = (callback) => {
  const query = 'SELECT * FROM todos';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching todos:', err.message);
      return callback(err);
    }
    callback(null, results);
  });
};

// Create a new todo in the database
exports.create = (title, callback) => {
  const query = 'INSERT INTO todos (title, completed) VALUES (?, ?)';
  db.query(query, [title, false], (err, result) => {
    if (err) {
      console.error('Error creating todo:', err.message);
      return callback(err);
    }
    callback(null, result);
  });
};

// Update the completed status of a todo
exports.update = (id, completed, callback) => {
  const query = 'UPDATE todos SET completed = ? WHERE id = ?';
  db.query(query, [completed, id], (err) => {
    if (err) {
      console.error('Error updating todo:', err.message);
      return callback(err);
    }
    callback(null);
  });
};

// Delete a todo from the database
exports.delete = (id, callback) => {
  const query = 'DELETE FROM todos WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting todo:', err.message);
      return callback(err);
    }
    callback(null);
  });
};

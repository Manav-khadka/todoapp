// API base URL
const apiBaseUrl = 'https://todoapp-pr5m.onrender.com/api/todos';

// DOM elements
const todoForm = document.getElementById('todo-form');
const todoTitleInput = document.getElementById('todo-title');
const todoList = document.getElementById('todo-list');
const filterDropdown = document.getElementById('filter-dropdown');

// Filter state
let filterState = 'all'; // Default filter is 'all'
let searchQuery = ''; // Default search query is an empty string

// Fetch all todos and render them
const fetchTodos = async () => {
  const response = await fetch(apiBaseUrl);
  const todos = await response.json();
  const filteredTodos = filterTodos(todos); // Apply filters
  renderTodos(filteredTodos); // Render the filtered todos
};

// Filter todos based on the selected filter state
const filterTodos = (todos) => {
  const filteredBySearch = todos.filter(todo => searchQuery === '' ||
    todo.title.toLowerCase().includes(searchQuery)
  );

  switch (filterState) {
    case 'active':
      return filteredBySearch.filter(todo => !todo.completed);
    case 'completed':
      return filteredBySearch.filter(todo => todo.completed);
    case 'all':
    default:
      return filteredBySearch;
  }
};

// Render todos list in the DOM
const renderTodos = (todos) => {
  todoList.innerHTML = ''; // Clear existing todos
  todos.forEach((todo) => {
    const li = document.createElement('li');
    const hr = document.createElement('hr');
    li.setAttribute('data-id', todo.id);

    if (todo.completed) {
      li.classList.add('completed');
    }

    const leftContainer = document.createElement('div');
    leftContainer.classList.add('left');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleComplete(todo.id, checkbox.checked));

    const text = document.createElement('span');
    text.textContent = todo.title;

    leftContainer.appendChild(checkbox);
    leftContainer.appendChild(text);

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa', 'fa-trash');
    deleteIcon.addEventListener('click', () => deleteTodo(todo.id));

    li.appendChild(leftContainer);
    li.appendChild(deleteIcon);
    todoList.appendChild(li);
    todoList.appendChild(hr);
  });
};

// Toggle the completed state of a todo
const toggleComplete = async (id, isCompleted) => {
  const response = await fetch(`${apiBaseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: isCompleted }),
  });

  if (response.ok) {
    const listItem = document.querySelector(`li[data-id='${id}']`);
    if (listItem) {
      if (isCompleted) {
        listItem.classList.add('completed');
      } else {
        listItem.classList.remove('completed');
      }
    }
  }
};

// Delete a todo
const deleteTodo = async (id) => {
  const response = await fetch(`${apiBaseUrl}/${id}`, { method: 'DELETE' });

  if (response.ok) {
    fetchTodos(); // Refresh the todo list
  }
};



// Handle filter dropdown change
filterDropdown.addEventListener('change', (e) => {
  filterState = e.target.value; // Update the filter state
  fetchTodos(); // Fetch and render the todos based on the new filter
});

// Handle search input event
const searchInput = document.getElementById('search-bar');
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase(); // Capture the search query
  fetchTodos(); // Fetch todos with updated search query
});

// Initialize app
fetchTodos();

// Dark mode toggle
const darkModeButton = document.getElementById('dark-mode-button');

// Check for saved preference in localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

// Toggle dark mode on button click
darkModeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Save preference to localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});
// Get dialog and buttons
const todoDialog = document.getElementById('todo-dialog');
const openAddTodoDialogButton = document.getElementById('open-add-todo-dialog');
const closeDialogButton = document.getElementById('close-dialog-btn');

// Open the dialog when the "Add Todo" button is clicked
openAddTodoDialogButton.addEventListener('click', () => {
  todoDialog.showModal();
});

// Close the dialog when the "Cancel" button is clicked
closeDialogButton.addEventListener('click', () => {
  todoDialog.close();
});

// Close the dialog when the user clicks outside of it
todoDialog.addEventListener('click', (e) => {
  if (e.target === todoDialog) {
    todoDialog.close();
  }
});

// Handle form submission to add a new todo
todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = todoTitleInput.value.trim();
  if (!title) return;

  const response = await fetch(apiBaseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  if (response.ok) {
    todoTitleInput.value = ''; // Clear input field
    todoDialog.close(); // Close the dialog
    fetchTodos(); // Refresh the todo list
  }
});

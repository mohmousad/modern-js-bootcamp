// Fetch existing todos from localStorage
const getSavedTodos = function () {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

// Save todos to local storage
const saveTodos = function (todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove todo by id
const removeTodo = function (id) {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Handling checked or unchecked checkboxes
const toggleTodo = function (id) {
  const todo = todos.find(function (todo) {
    return todo.id === id;
  });
  if (todo) {
    todo.completed = !todo.completed;
  }
};

// Render todos based on filters
const renderTodos = function (todos, filters) {
  // Applying Filters
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  // Summary Sentence
  document.querySelector("#todos").innerHTML = "";
  const incompleteTodos = todos.filter(function (todo) {
    return !todo.completed;
  });
  document.querySelector("#todos").appendChild(generateSummaryDOM(incompleteTodos));
  // Rendring the todolist after applying filters
  filteredTodos.forEach(function (todo) {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

// Generate DOM elements
const generateTodoDOM = function (todo) {
  // Completed or not checkbox
  const checkBtn = document.createElement("input");
  checkBtn.setAttribute("type", "checkbox");
  checkBtn.checked = todo.completed;
  checkBtn.addEventListener("change", function () {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Todo text
  const todoText = document.createElement("span");
  todoText.textContent = todo.text;

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.addEventListener("click", function () {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Todo element div
  const todoEl = document.createElement("div");
  todoEl.appendChild(checkBtn);
  todoEl.appendChild(todoText);
  todoEl.appendChild(deleteBtn);
  return todoEl;
};

// Get the summary
const generateSummaryDOM = function (incompleteTodos) {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};

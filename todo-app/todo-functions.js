// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  return todosJSON ? JSON.parse(todosJSON) : [];
  // if (todosJSON !== null) {
  //   return JSON.parse(todosJSON);
  // } else {
  //   return [];
  // }
};

// Save todos to local storage
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove todo by id
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Handling checked or unchecked checkboxes
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

// Render todos based on filters
const renderTodos = (todos, filters) => {
  // Applying Filters
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  // Summary Sentence
  document.querySelector("#todos").innerHTML = "";
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  document.querySelector("#todos").appendChild(generateSummaryDOM(incompleteTodos));
  // Rendring the todolist after applying filters
  filteredTodos.forEach((todo) => {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

// Generate DOM elements
const generateTodoDOM = (todo) => {
  // Completed or not checkbox
  const checkBtn = document.createElement("input");
  checkBtn.setAttribute("type", "checkbox");
  checkBtn.checked = todo.completed;
  checkBtn.addEventListener("change", () => {
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
  deleteBtn.addEventListener("click", () => {
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
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};

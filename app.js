// Todo List App

// Declare variables
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

let todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

console.log(todoForm, todoInput, todoList, todoItems)

// Add a new todo item
function addTodo(text) {
  const todo = {
    text,
    completed: false
  };
  todoItems.push(todo);
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
  renderTodoList();
}

// Remove a todo item
function removeTodo(event) {
  const button = event.target;
  const li = button.parentElement;
  const index = Array.from(todoList.children).indexOf(li);
  todoItems.splice(index, 1);
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
  renderTodoList();
}

// Render the todo list
function renderTodoList() {
  todoList.innerHTML = "";
  for (let todo of todoItems) {
    const li = document.createElement("li");
    li.innerHTML = `
      ${todo.text} 
      <button class="remove-todo">X</button>
    `;
    li.classList.add("todo-item");
    if (todo.completed) {
      li.classList.add("completed");
    }
    li.addEventListener("click", toggleCompleted);
    todoList.appendChild(li);
  }
}

// Toggle the completed status of a todo item
function toggleCompleted(event) {
  const li = event.target;
  const index = Array.from(todoList.children).indexOf(li);
  todoItems[index].completed = !todoItems[index].completed;
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
  renderTodoList();
}

// Handle form submission
todoForm.addEventListener("submit", event => {
  event.preventDefault();
  const text = todoInput.value;
  todoInput.value = "";
  addTodo(text);
});

// Render the initial todo list
renderTodoList();

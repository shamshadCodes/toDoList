// Get the form, input, and list elements
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

// Get the todo items from local storage, or an empty array if none exist
let todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

// Add a new todo item to the list
function addTodo(text) {
  const todo = {
    text,
    completed: false
  };
  todoItems.push(todo);
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
  renderTodoList();
}

// Render the todo list
function renderTodoList() {
  todoList.innerHTML = "";
  for (let i = 0; i < todoItems.length; i++) {
    const todo = todoItems[i];
    const li = document.createElement("li");
    li.innerText = todo.text;
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
}

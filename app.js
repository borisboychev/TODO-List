const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded", getLocalTODOs);
todoButton.addEventListener("click", addTODO);
todoList.addEventListener("click", deleteCheckTODO);
filterOption.addEventListener("click", filterTODO);

//funcs
function addTODO(event) {
  //doesnt reload page every time button is clicked
  event.preventDefault();
  //todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  saveLocalTODOs(todoInput.value);
  //check button
  const checkedButton = document.createElement("button");
  checkedButton.innerHTML = `<i class="fas fa-check"></i>`;
  checkedButton.classList.add("checked-button");
  todoDiv.appendChild(checkedButton);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  //append to list
  todoList.appendChild(todoDiv);
  //clear todo input value
  todoInput.value = "";
}

function deleteCheckTODO(event) {
  const item = event.target;
  //delete
  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement;
    removeLocalTODOs(todo);
    todo.classList.add("fall");
    todo.addEventListener("transition", function () {
      todo.remove();
    });
  }
  //check
  if (item.classList[0] === "checked-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}

function filterTODO(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("uncompleted")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTODOs(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    try {
      todos = JSON.parse(localStorage.getItem("todos"));
    } catch (err) {
      console.log(err);
      todos = [];
    }
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTODOs() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    try {
      todos = JSON.parse(localStorage.getItem("todos"));
    } catch (err) {
      console.log(err);
      todos = [];
    }
  }
  //console.log(typeof todos);
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //check button
    const checkedButton = document.createElement("button");
    checkedButton.innerHTML = `<i class="fas fa-check"></i>`;
    checkedButton.classList.add("checked-button");
    todoDiv.appendChild(checkedButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTODOs(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    try {
      todos = JSON.parse(localStorage.getItem("todos"));
    } catch (err) {
      console.log(err);
      todos = [];
    }
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

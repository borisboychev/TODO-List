const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

/* EVENT LISTENERS */
document.addEventListener("DOMContentLoaded", getLocalTODOs);
todoButton.addEventListener("click", addTODO);
todoList.addEventListener("click", deleteCheckTODO);
filterOption.addEventListener("click", filterTODO);

/* ADD TODOS */
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

  const checkedButton = document.createElement("button");
  checkedButton.innerHTML = `<i class="fas fa-check"></i>`;
  checkedButton.classList.add("checked-button");
  todoDiv.appendChild(checkedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

/* DELETE OR CHECK TODOS */
function deleteCheckTODO(event) {
  const item = event.target;

  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transition", function () {
      todo.remove();
    });
    removeLocalTODOs(todo);
  }

  if (item.classList[0] === "checked-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

/* FILTER TODOS */
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
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

/* SAVE LOCAL TODOS */
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

/* GET LOCAL TODOS */
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

/* REMOVE LOCAL TODOS */
function removeLocalTODOs(todo) {
  try {
    let todos = JSON.parse(localStorage.getItem("todos"));
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

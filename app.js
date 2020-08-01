const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//event listeners
todoButton.addEventListener("click", addTODO);
todoList.addEventListener("click", deleteCheckTODO);

//funcs
function addTODO(event) {
  //doesnt reload page every time button is clicked
  event.preventDefault();
  //todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");

  if (todoInput.value === "") {
    alert("Cannot add empty string to TODO List");
    return;
  }

  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //check button
  const checkedButton = document.createElement("button");
  checkedButton.innerHTML = '<i class="fas fa-check"></i>';
  checkedButton.classList.add("checked-button");
  todoDiv.appendChild(checkedButton);

  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
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
    todo.classList.add("fall");
    todo.addEventListener("transition", function () {
      todo.remove();
    });
  }

  //check
  if (item.classList[0] === "checked-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//event listeners
todoButton.addEventListener("click", addTODO);

function addTODO(event) {
  //doesnt reload page every time button is clicked
  event.preventDefault();
  //todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = "hey";
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
}

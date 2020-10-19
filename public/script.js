const listDOM = document.getElementById("list");
const addTodosdata = document.getElementById("todo-input");
let todosList = [];
const getTodos = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET");
  xhr.responseType = "json";
  xhr.onload = () => {
    todosList = xhr.response;
    renderTodos();
    console.log(todosList, "response mongo");
    console.log("this is the script", port);
  };
  xhr.send();
};
addTodosdata.addEventListener("keypress", function (e) {
  if (13 == e.keyCode) {
    addTodoToList(todosList, addTodosdata.value);
    addTodos();
    addTodosdata.value = "";
    getTodos();
    renderTodos();
  }
});
function addTodoToList(list, elem) {
  if (elem) {
    const newelem = { name: elem, completed: false, editing: false };
    list.unshift(newelem);
    renderTodos();
  }
}
const addTodos = () => {
  let data;
  const request1 = new XMLHttpRequest();
  request1.responseType = "json";
  request1.open("POST");
  request1.setRequestHeader("Content-Type", "application/json");
  request1.onload = () => {
    data = request1.response;
    console.log(data);
  };
  request1.send(JSON.stringify({ input: addTodosdata.value }));
};
function createInput(a, todo) {
  var input1 = document.createElement("INPUT");
  if (todo.completed === true) {
    input1.classList.add("completed");
  }
  input1.value = todo.name;
  input1.name = todo._id;
  input1.classList = "texto";
  input1.focus();
  input1.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      let value = input1.value;
      updatedTodos(value, todo);
      renderTodos();
    }
  });
  a.appendChild(input1);
}
const updatedTodos = (value, todo) => {
  todo.name = value;
  todo.editing = false;
  todo.data = value;
  const request1 = new XMLHttpRequest();
  request1.responseType = "json";
  request1.open("PUT");
  request1.setRequestHeader("Content-Type", "application/json");
  request1.send(JSON.stringify(todo));
  request1.onload = () => {
    data = request1.response;
    getTodos();
    renderTodos();
  };
};
function createDelete(a, todo) {
  var btn1 = document.createElement("BUTTON");
  btn1.innerHTML = "delete";
  btn1.className = "deletebtn";
  btn1.name = "deletebtn";
  btn1.value = todo._id;
  btn1.addEventListener("click", function () {
    todosList = todosList.filter((item) => item._id !== todo._id);
    deleteTodos(todo._id);
    renderTodos();
  });
  a.appendChild(btn1);
}
const deleteTodos = (input) => {
  console.log("dans xhr", input);
  let data;
  const request1 = new XMLHttpRequest();
  request1.responseType = "json";
  request1.open("DELETE");
  request1.setRequestHeader("Content-Type", "application/json");
  request1.onload = () => {
    data = request1.response;
    console.log(data);
  };
  request1.send(JSON.stringify({ _id: input }));
};
function createtext(a, todo) {
  var text = document.createElement("Label");
  text.innerHTML = todo.name;
  text.className = "text";
  if (todo.completed === true) {
    text.classList.add("completed");
  }
  text.addEventListener("dblclick", function () {
    todo.editing = true;
    renderTodos();
  });
  a.appendChild(text);
}
function renderTodos() {
  let olDOM = document.createElement("OL");
  listDOM.innerHTML = "";
  olDOM.className = "list";
  todosList.map((oneTodo) => {
    var listItem = document.createElement("LI");
    listItem.className = "list-item";
    createCheckbox(listItem, oneTodo);
    if (oneTodo.editing == false) {
      createtext(listItem, oneTodo);
    } else {
      createInput(listItem, oneTodo);
    }
    createDelete(listItem, oneTodo);
    olDOM.appendChild(listItem);
  });
  listDOM.appendChild(olDOM);
}
getTodos();
renderTodos();
function createCheckbox(a, todo) {
  var check = document.createElement("input");
  check.type = "checkbox";
  check.className = "completedbtn";
  check.checked = todo.completed;
  check.addEventListener("click", function () {
    todo.completed = !todo.completed;
    completeTodos(todo);
    renderTodos();
  });
  a.appendChild(check);
}
const completeTodos = (todo) => {
  const issue = todo;
  if (issue.completed) {
    issue.completed = "true";
  } else {
    issue.completed = "false";
  }
  issue.data = issue.name;
  let data;
  const request1 = new XMLHttpRequest();
  request1.responseType = "json";
  request1.open("put");
  request1.setRequestHeader("Content-Type", "application/json");
  request1.onload = () => {
    data = request1.response;
    console.log(data);
    getTodos();
    renderTodos();
  };
  request1.send(JSON.stringify(issue));
};

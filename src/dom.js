import "./style.css";

function htmlLabel(contentName) {
  const label = document.createElement("label");
  label.textContent = contentName + ":";
  label.setAttribute("id", contentName.toLowerCase());
  label.htmlFor = contentName.toLowerCase();
  return label;
}
function txtInput(txt, arr) {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = txt;
  if (txt == "Title") {
    input.required = true;
  }
  input.setAttribute("id", txt);
  arr.push(input);
  return input;
}
function dateInput(arr) {
  const label = htmlLabel("dueDate");
  const input = document.createElement("input");
  input.type = "date";
  input.setAttribute("id", "dueDate");
  input.min = "2023-01-01"; /* Here we use api to use today date */

  arr.push(label);
  arr.push(input);

  return input;
}
function selectOption(optValue, select) {
  const opt = document.createElement("option");
  opt.value = optValue.toLowerCase();
  opt.textContent = optValue;
  select.appendChild(opt);
  return opt;
}
function priorityInput(arr) {
  const label = htmlLabel("Priority");
  const input = document.createElement("select");
  input.setAttribute("id", "priority");

  selectOption("High", input);
  selectOption("Mid", input);
  selectOption("Low", input);

  arr.push(label);
  arr.push(input);
  return input;
}
function btn_close(arr) {
  const btnClose = document.createElement("button");
  btnClose.textContent = "Close";
  btnClose.setAttribute("id", "close");
  arr.push(btnClose);
  return btnClose;
}

function btnAdd(arr) {
  const btn = document.createElement("button");
  btn.textContent = "Add task";
  btn.setAttribute("id", "add-card");
  arr.push(btn);
  return btn;
}
function removeElement(e) {
  const container = document.querySelector(".card-container");
  if (e.textContent === undefined) {
    const card = this.parentElement;
    container.removeChild(card);
  } else {
    const parent = e.parentElement;
    parent.removeChild(e);
  }
}

function domEvents(btn) {
  if (btn.textContent == "Close") {
    btn.addEventListener("click", removeElement);
  }
  if (btn.textContent == "Add task") {
    btn.addEventListener("click", addtsk);
  }
}

function addtsk() {
  const card = this.parentElement;
  if (card.children[0].value.length > 1) {
    domCard(card.children, card);
  }
}
function toObj(lst) {
  let obj = {};
  for (let i of lst) {
    if (i.localName != "label") {
      obj[i.id] = i.value;
    }
  }
  return obj;
}
function domCard(elChildren, parent) {
  const container = document.querySelector(".card-container");
  const card = document.createElement("div");
  card.className = "card";
  let all_el = toObj(elChildren);
  const els_info = [
    ["h2", "today-date", "TODAY DATE"],
    ["h3", "title", all_el["Title"]],
    ["h4", "description", all_el["Description"]],
    ["h4", "dueDate", all_el["dueDate"]],
    ["h4", "priority", all_el["Priority"]],
  ];

  els_info.forEach((item) => {
    const el = simple_el(item[0], item[1], item[2]);
    card.appendChild(el);
  });
  removeElement(parent);
  container.appendChild(card);
  showBtnTask();
}
function simple_el(type, selector_name, innerContent) {
  const ell = document.createElement(type);
  ell.className = selector_name;
  ell.textContent = innerContent;
  return ell;
}

function showBtnTask() {
  const addTask = document.querySelector(".add-task");
  addTask.setAttribute("style", "display: block;");
}

function hideBtnTask() {
  const addTask = document.querySelector(".add-task");
  addTask.setAttribute("style", "display: none;");
}

function cardTemplate() {
  const card = document.createElement("div");
  card.className = "card";
  const container = document.querySelector(".card-container");

  const allElements = [];
  const title = txtInput("Title", allElements);
  const description = txtInput("Description", allElements);
  const dueDate = dateInput(allElements);
  const priority = priorityInput(allElements);
  const btnClose = btn_close(allElements);
  const btnAddTask = btnAdd(allElements);
  allElements.forEach((obj) => card.appendChild(obj));
  container.appendChild(card);
  domEvents(btnClose);
  domEvents(btnAddTask);

}
function callCard() {
  let input_open = false;
  const addTask = document.querySelector(".add-task");
  addTask.addEventListener("click", () => {
    cardTemplate();
    hideBtnTask();
  });
}
export default callCard;

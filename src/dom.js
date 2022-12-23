import "./style.css";
import createEl from "/src/createElements.js";
import dDate from "/src/date-mod.js";


const create = createEl();
const checkDate = dDate()
function removeElement(e) {
  const container = document.querySelector(".card-container");
  if (e.textContent === undefined) {
    const card = this.parentElement;
    container.removeChild(card);
  } else {
    const parent = e.parentElement;
    parent.removeChild(e);
  }
  showBtnTask();
}

function domEvents(btn) {
  if (btn.textContent == "Close") {
    btn.addEventListener("click", removeElement);
  }
  if (btn.textContent == "Add task") {
    btn.addEventListener("click", addCard);
  }
}

function addCard() {
  const card = this.parentElement;
  if (card.children[0].value.length > 1) {
    domCard(card.children, card);
    showBtnTask();
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
  if (all_el['dueDate'].length > 1){
    console.log(all_el['dueDate'])
    const newDate = checkDate.checkDistance(all_el['dueDate'])
    all_el['dueDate'] = newDate;
  }
  const els_info = [
    ["h1", "title", all_el["Title"]],
    ["h3", "dueDate", all_el["dueDate"]],
    ["h3", "description", all_el["Description"]],
    /* here a function that change the card color with the priority selected */
    ["h3", "priority", all_el["priority"]],
  ];

  els_info.forEach((item) => {
    const el = simple_el(item[0], item[1], item[2]);
    card.appendChild(el);
  });
  removeElement(parent);
  container.appendChild(card);
}

function simple_el(type, selector_name, innerContent) {
  const ell = document.createElement(type);
  ell.className = selector_name;
  ell.textContent = innerContent;
  return ell;
}

function createInputEls() {
  const allElements = [];

  create.txtInput("Title", allElements);
  create.txtInput("Description", allElements);
  create.dateInput(allElements);
  create.priorityInput(allElements);

  const btnClose = create.btn_close(allElements);
  const btnAddTask = create.btnAdd(allElements);
  return {allElements,btnClose,btnAddTask};
}

function inputCard() {
  const card = document.createElement("div");
  card.className = "card";
  const container = document.querySelector(".card-container");
  const inputs = createInputEls();
  inputs.allElements.forEach((obj) => card.appendChild(obj));
  container.appendChild(card);
  domEvents(inputs.btnClose);
  domEvents(inputs.btnAddTask);
}
function showBtnTask() {
  const addTask = document.querySelector(".add-task");
  addTask.setAttribute("style", "display: block;");
}

function hideBtnTask() {
  const addTask = document.querySelector(".add-task");
  addTask.setAttribute("style", "display: none;");
}

export { inputCard, domCard, hideBtnTask };

import "./style.css";
import createEl from "/src/createElements.js";
import {storeContent_changeDate} from "/src/date-mod.js";

const create = createEl();

function removeStorageItem() {
  const itemKey = this.parentElement.className.replace("card-", "");
  sessionStorage.removeItem(itemKey);
}
function removeElement(e) {
  const container = document.querySelector(".card-container");
  console.log(e.textContent, "***", this, this.parentElement);
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
  if (btn.textContent == "Delete") {
    btn.addEventListener("click", removeElement);
    btn.addEventListener("click", removeStorageItem);
  }
}

function addCard() {
  const card = this.parentElement;
  if (card.children[0].value.length > 1) {
    domCard(card.children);
    showBtnTask();
  }
}

function domCard(elChildren) {
  const card_input = document.querySelector(".card-input");
  const container = document.querySelector(".card-container");
  const card = document.createElement("div");
  let all_el = storeContent_changeDate(elChildren);
  card.className = "card-" + all_el["storageKey"];

  const els_info = [
    ["h1", "title", all_el["title"]],
    ["h3", "dueDate", all_el["dueDate"]],
    ["h3", "description", all_el["description"]],
    /* here a function that change the card color with the priority selected */
    ["h3", "priority", all_el["priority"]],
  ];

  els_info.forEach((item) => {
    const el = simple_el(item[0], item[1], item[2]);
    card.appendChild(el);
  });

  if (card_input != null) {
    container.removeChild(card_input);
  }

  const btnDel = create.btn_close([], "Delete");
  card.appendChild(btnDel);
  container.appendChild(card);
  domEvents(btnDel);
}

function simple_el(type, selector_name, innerContent) {
  const ell = document.createElement(type);
  ell.className = selector_name;
  ell.textContent = innerContent;
  return ell;
}

function createInputEls() {
  const allElements = [];

  create.txtInput("title", allElements);
  create.txtInput("description", allElements);
  create.dateInput(allElements);
  create.priorityInput(allElements);
  create.projectsSelector(allElements)

  const btnClose = create.btn_close(allElements, "Close");
  const btnAddTask = create.btnAdd(allElements);
  return { allElements, btnClose, btnAddTask };
}

function inputCard() {
  const card = document.createElement("div");
  card.className = "card-input";
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

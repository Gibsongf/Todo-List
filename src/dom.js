import "./style.css";
import createEl from "/src/createElements.js";
import dDate from "/src/date-mod.js";

const create = createEl();
const checkDate = dDate();

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
function elementToObj(elem) {
  let obj = {};
  let arr = Array.from(elem).filter(unnecessaryEls);
  arr.forEach((item) => (obj[item.id] = item.value));

  function unnecessaryEls(el) {
    if (el.localName != "label" && el.localName != "button") {
      if (el.id == "dueDate" || el.value.length > 1) {
        return el;
      }
    }
  }
  return obj;
}
function store_changeDate(lst) {
  let obj = elementToObj(lst);
  function storeTask(contentObj, storeContent) {
    function keyStorage() {
      let newKeyNumber = sessionStorage.getItem("objKey");
      if (typeof newKeyNumber != "string") {
        sessionStorage.setItem("objKey", 0);
      } else {
        sessionStorage.setItem("objKey", ++newKeyNumber);
      }
      obj["storageKey"] = sessionStorage["objKey"];
      sessionStorage[sessionStorage["objKey"]] = JSON.stringify(contentObj);
    }

    if (contentObj["dueDate"].length > 1) {
      if (storeContent == true) {
        keyStorage();
      }
      contentObj["dueDate"] = checkDate.checkDistance(contentObj["dueDate"]);
    } else {
      contentObj["dueDate"] = checkDate.todayDate();
      if (storeContent == true) {
        keyStorage();
      }
    }
  }
  if (obj["title"] == undefined) {
    storeTask(lst);
    return lst;
  }
  storeTask(obj, true);
  return obj;
}

function domCard(elChildren) {
  const card_input = document.querySelector(".card-input");
  const container = document.querySelector(".card-container");
  const card = document.createElement("div");
  let all_el = store_changeDate(elChildren);
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

import "./style.css";
import createEl from "/src/createElements.js";
import {
  handleContent,
  removeStorageItem,
  updateProjectStorage,
} from "/src/date-storage-mod.js";
const create = createEl();

function deleteElement() {
  const container = document.querySelector(".card-container");
  const ul = document.querySelector(".list-projects");
  if (this.parentElement.localName == "li") {
    const li = this.parentElement;
    ul.removeChild(li);
    return;
  } else {
    const card = this.parentElement;
    container.removeChild(card);
    return;
  }
}
function hideElement(e) {
  const arr = [
    "pop-up-card",
    "pop-up-project",
    "pop-up-edit",
    "pop-up-content-project",
    "pop-up-content-card",
    "pop-up-content-edit",
  ];
  if (e.srcElement == undefined) {
    e.srcElement = e;
  }
  if (arr.includes(e.srcElement.parentElement.className)) {
    e.srcElement.parentElement.parentElement.setAttribute(
      "style",
      "display: none;"
    );
    return;
  }
  if (arr.includes(e.srcElement.parentElement.className)) {
    e.srcElement.parentElement.parentElement.setAttribute(
      "style",
      "display: none;"
    );
    return;
  }
}

function domEvents(btn) {
  const obj = {
    'Close': hideElement,
    "Add task": addContent,
    'Confirm': [clickDel, addContent],
    "New project": addContent,
    'delete': [deleteElement, removeStorageItem],
    'edit': show_del_popup,
  };
  let callName = "";
  if (Object.keys(obj).includes(btn.textContent)) {
    callName = btn.textContent;
  }
  if (Object.keys(obj).includes(btn.className)) {
    callName = btn.className;
  }

  if (typeof obj[callName] == "object") {
    obj[callName].forEach((doIt) => btn.addEventListener("click", doIt));
    return;

  } else {
    btn.addEventListener("click", obj[callName]);
    return;
  }
}
function clickDel() {
  const key = this.id.split("-")[1];
  const task = document.querySelector(".card-" + key);
  task.children[4].click();
}

function addProject(txt) {
  const ul_projects = document.querySelector(".list-projects");
  const li = document.createElement("li");
  const div = create.simple_el("div", "", txt);

  li.appendChild(div);
  ul_projects.appendChild(li);
  updateProjectStorage();

  const btnDel = create.btnDel(true);
  li.appendChild(btnDel);
  domEvents(btnDel);
}

function addContent(btn) {
  const task = btn.srcElement.parentElement;
  const btnParent = btn.srcElement.parentElement.className.split("-")[3];
  const title = btn.srcElement.parentElement.children[1].value;
  if (btnParent == "project") {
    if (title.length > 1 && title.length < 15) {
      addProject(title);
      hideElement(btn);
    }
  }
  if (title.length > 1 && btnParent != "project" && title.length < 25) {
    newDomCard(task.children);
    hideElement(btn);
  }
}
function priorityColor(priority, el) {
  console.log(priority,typeof priority)
  const colors = {
    'high': "red",
    'mid': "yellow",
    'low': "blue",
  };
  el.setAttribute("style", "border-color:" + colors[priority]);
}
function newDomCard(elChildren) {
  const card_input = document.querySelector(".card-input");
  const container = document.querySelector(".card-container");
  const card = document.createElement("div");
  let all_el = handleContent(elChildren);
  card.className = "card-" + all_el["storageKey"];

  const els_info = [
    ["h1", "title", all_el["title"]],
    ["h3", "dueDate", all_el["dueDate"]],
    ["h3", "description", all_el["description"]],
    ["h3", "priority", all_el["priority"]],
  ];

  els_info.forEach((item) => {
    const el = create.simple_el(item[0], item[1], item[2]);
    card.appendChild(el);
  });

  if (card_input != null) {
    container.removeChild(card_input);
  }
  const btnDel = create.btnDel();
  const btnEdit = create.btnEdit();
  card.appendChild(btnDel);
  card.appendChild(btnEdit);
  priorityColor(all_el["priority"], card);
  container.appendChild(card);
  domEvents(btnDel);
  domEvents(btnEdit);

  /* this avoid the card showing at the wrong place when created*/
  const selectID = document.getElementById("selected");
  selectID.click();
}

function InputElsProject() {
  const allElements = [];
  create.txtInput("name", "", allElements);
  const btnClose = create.btn_creator(allElements, "Close");
  const btnAdd = create.btn_creator(allElements, "New project");
  const two_popUp = create.popEl("project");
  allElements.forEach((el) => two_popUp.popup_content.appendChild(el));
  return { allElements, btnClose, btnAdd };
}

function popupToEdit(e) {
  const cardKey = e.parentElement.className.split("-")[1];
  const allElements = [];
  const all_inputs = DomCardInput(allElements);
  const obj = JSON.parse(sessionStorage[cardKey]);

  Object.keys(obj).forEach((key) => {
    if (key != "stored" && key != "storageKey") {
      all_inputs[key].value = obj[key];
    }
  });

  const btnClose = create.btn_creator(allElements, "Close");
  const btnAdd = create.btn_creator(allElements, "Confirm");
  btnAdd.setAttribute("id", "key-" + cardKey);
  const two_popUp = create.popEl("edit");
  allElements.forEach((el) => two_popUp.popup_content.appendChild(el));
  return { btnClose, btnAdd };
}

function defaultCardInput() {
  const allElements = [];
  DomCardInput(allElements);
  const btnClose = create.btn_creator(allElements, "Close");
  const btnAdd = create.btn_creator(allElements, "Add task");
  const two_popUp = create.popEl("card");
  allElements.forEach((el) => two_popUp.popup_content.appendChild(el));
  return { btnClose, btnAdd, two_popUp };
}

function DomCardInput(allElements) {
  const title = create.txtInput("title", "min 2 characters", allElements);
  const description = create.txtInput(
    "description",
    "min 2 characters",
    allElements
  );
  const dueDate = create.dateInput(allElements);
  const priority = create.priorityInput(allElements);
  const projects = create.projectsSelector(allElements);
  return { title, description, dueDate, priority, projects };
}

function show_del_popup() {
  const btnClicked = this;
  let keyName = this.className.split("-");
  if (keyName.length > 1) {
    keyName = keyName[1];
  } else {
    keyName = keyName[0];
  }
  const obj = {
    edit: popupToEdit,
    project: InputElsProject,
    task: defaultCardInput,
  };
  function showPop() {
    delPop(keyName);
    if (keyName == "edit") {
      const inputs = obj[keyName](btnClicked);
      domEvents(inputs.btnClose);
      domEvents(inputs.btnAdd);
    } else {
      const inputs = obj[keyName]();
      domEvents(inputs.btnClose);
      domEvents(inputs.btnAdd);
    }
  }
  function delPop(popName) {
    if (popName == "task") {
      popName = "card";
    }

    const hasPop = document.querySelector(".pop-up-" + popName);
    if (hasPop != null) {
      hasPop.parentElement.removeChild(hasPop);
    }
  }
  showPop();
}


export { newDomCard, addProject, show_del_popup };

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
  e.setAttribute(
    "style",
    "display: none;"
  );
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
  let btnName = "";
  if (Object.keys(obj).includes(btn.textContent)) {
    btnName = btn.textContent;
  }
  if (Object.keys(obj).includes(btn.className)) {
    btnName = btn.className;
  }
  if (btnName == "Close") {
    btn.addEventListener("click", () => {
      obj[btnName](btn.parentElement.parentElement.parentElement);
    });
    return
  } 
  if (typeof obj[btnName] == "object") {
    obj[btnName].forEach((doIt) => btn.addEventListener("click", doIt));
    return;
  } 
  else {
    btn.addEventListener("click", obj[btnName]);
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
  const task = btn.srcElement.parentElement.parentElement;
  const btnParent = task.className.split("-")[3]
  const title = task.children[1].value;
  if (btnParent == "project") {
    if (title.length > 1 && title.length < 15) {
      addProject(title);
      hideElement(task.parentElement);
    }
  }
  if (title.length > 1 && btnParent != "project" && title.length < 25) {
    newDomCard(task.children);
    hideElement(task.parentElement);
  }
}
function priorityColor(priority, el) {
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
  if(selectID == null){
    const all = document.querySelector('.all-tasks')
    all.setAttribute('id','selected')
    all.click();
  }
  else{
    selectID.click();
  }
}
function btn_Container(btnAddName){
  const btnContainer = create.simple_el('div','btn-container')
  const btnClose = create.btn_creator([], "Close");
  const btnAdd = create.btn_creator([], btnAddName);
  btnContainer.appendChild(btnClose)
  btnContainer.appendChild(btnAdd)
  return {btnContainer, btnClose, btnAdd}
}
function InputElsProject() {
  const allElements = [];
  create.txtInput("name", "", allElements);
  const btn = btn_Container('New project')
  const two_popUp = create.popEl("project");
  allElements.forEach((el) => two_popUp.popup_content.appendChild(el));
  two_popUp.popup_content.appendChild(btn.btnContainer)
  return btn;
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
  const btn = btn_Container('Confirm')
  btn.btnAdd.setAttribute("id", "key-" + cardKey);
  const two_popUp = create.popEl("edit");
  allElements.forEach((el) => two_popUp.popup_content.appendChild(el));
  two_popUp.popup_content.appendChild(btn.btnContainer)
  return btn ;
}

function defaultCardInput() {
  const allElements = [];
  DomCardInput(allElements);
  const btn = btn_Container('Add task')
  const two_popUp = create.popEl("card");
  allElements.forEach((el) => two_popUp.popup_content.appendChild(el));
  two_popUp.popup_content.appendChild(btn.btnContainer)
  return btn ;
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
      console.log(inputs)
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

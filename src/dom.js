import "./style.css";
import createEl from "/src/createElements.js";
import {
  handleContent,
  removeStorageItem,
  updateProjectStorage
} from "/src/date-storage-mod.js";
const create = createEl();

function deleteElement() {
  console.log(this)
  const container = document.querySelector(".card-container");
  const ul = document.querySelector(".list-projects");
  if (this.parentElement.localName == "li") {
    const li = this.parentElement;
    ul.removeChild(li);
    return;
  }
  else {
    const card = this.parentElement;
    container.removeChild(card);
    return;
  }
}
function hideElement(e) {
  const arr = [
    "pop-up-card",
    "pop-up-project",
    'pop-up-edit',
    "pop-up-content-project",
    "pop-up-content-card",
    "pop-up-content-edit"
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
  if (btn.textContent == "Close") {
    btn.addEventListener("click", hideElement);
  }
  if (btn.textContent == "Add task") {
    btn.addEventListener("click", addTask);
  }
  if (btn.className == "delete") {
    btn.addEventListener("click", deleteElement);
    btn.addEventListener("click", removeStorageItem);
  }
  if (btn.className == "edit") {
    btn.addEventListener("click", show_del_popup);
    
  }
  if (btn.textContent == "New project") {
    btn.addEventListener("click", checkProjectTitle);
  }
}

function checkProjectTitle(btn) {
  const name = document.getElementById("name");
  if (name.value.length > 1 && name.value.length < 20) {
    addProject(name.value);
    hideElement(btn);
  }
}
function addProject(txt) {
  const ul_projects = document.querySelector(".list-projects");
  const li = document.createElement("li");
  const div = create.simple_el("div", "", txt);

  li.appendChild(div);
  ul_projects.appendChild(li);
  updateProjectStorage();

  const btnDel = create.btn_creator([], "Delete");
  li.appendChild(btnDel);
  domEvents(btnDel);
}
function addTask(btn) {
  const task = document.querySelector(".pop-up-content-card");
  const title = document.getElementById("title");
  if (title.value.length > 1 && title.value.length < 20) {
    newDomCard(task.children);
    hideElement(btn);
  }
}
function priorityColor(priority, el) {
  const colors = {
    high: "red",
    mid: "yellow",
    low: "blue",
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

  const btnDel = create.btnDel()
  const btnEdit = create.btnEdit()
  card.appendChild(btnDel);
  card.appendChild(btnEdit)
  priorityColor(all_el["priority"], card);
  container.appendChild(card);
  domEvents(btnDel);
  domEvents(btnEdit);
}

function InputElsProject() {
  const allElements = [];
  create.txtInput("name", "", allElements);
  const btnClose = create.btn_creator(allElements, "Close");
  const btnAdd = create.btn_creator(allElements, "New project");
  const two_popUp = create.popEl("project");
  allElements.forEach((el) => two_popUp.popup_content.appendChild(el));
  return {allElements, btnClose, btnAdd};
}

function popupToEdit(e) {
  const cardKey = e.parentElement.className.split('-')[1]
  const allElements = [];
  const allinputs = DomCardInput(allElements)
  const obj = JSON.parse(sessionStorage[cardKey])

  console.log(obj)
  Object.keys(obj).forEach(key =>{
    if(key != "stored" && key != "storageKey" ){
      allinputs[key].value = obj[key]
    }
  })
  
  const btnClose = create.btn_creator(allElements, "Close");
  const btnAdd = create.btn_creator(allElements, "Confirm");
  const two_popUp = create.popEl("edit");
  allElements.forEach((el) => two_popUp.popup_content.appendChild(el));
  return {btnClose, btnAdd}
}

function defaultCardInput() {
  const allElements = [];
  DomCardInput(allElements)
  const btnClose = create.btn_creator(allElements, "Close");
  const btnAdd = create.btn_creator(allElements, "Add task");
  const two_popUp = create.popEl("card");
  allElements.forEach((el) => two_popUp.popup_content.appendChild(el));
  return {btnClose, btnAdd, two_popUp};
}

function DomCardInput(allElements) {
  const title = create.txtInput("title", "", allElements);
  const description = create.txtInput("description", "", allElements);
  const dueDate =create.dateInput(allElements);
  const priority = create.priorityInput(allElements);
  const projects = create.projectsSelector(allElements);
  return {title, description, dueDate, priority, projects}
}


/* i think we can make this function the main one to create and del the pop-ups */
function show_del_popup() {
  const btnClicked = this;
  const keyName = this.className

  const obj = {
    'edit':[popupToEdit, "edit"],
    'add-project': [InputElsProject, "project"],
    'add-task':[defaultCardInput, "card"]
  }
  console.log(this,this.className)
  function showPop(){
    delPop(obj[keyName][1])
    if(keyName == 'edit'){
      const inputs = obj[keyName][0](btnClicked)
      domEvents(inputs.btnClose);
      domEvents(inputs.btnAdd);
    }
    else {
      const inputs = obj[keyName][0]();
      domEvents(inputs.btnClose);
      domEvents(inputs.btnAdd);
    }
    
  }
  function delPop(popName){
    const hasPop = document.querySelector(".pop-up-"+popName);
    if (hasPop != null) {
      hasPop.parentElement.removeChild(hasPop) 
    }
  }
  showPop()
  
 
}

function editTask() {
  const btnClicked = this;
  console.log(this.className)
  function createPopEdit(){
    const inputs = popupToEdit(btnClicked);
    domEvents(inputs.btnClose);
    domEvents(inputs.btnAdd);
  }
  const hasPop = document.querySelector(".pop-up-edit");
  if (hasPop != null) {
    hasPop.parentElement.removeChild(hasPop)
    createPopEdit()

  } else {
    createPopEdit()
  }
}

export {newDomCard, addProject, popupToEdit as editCard,show_del_popup};

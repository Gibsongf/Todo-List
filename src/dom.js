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
  console.log(btn.className)
  if (btn.textContent == "Close") {
    btn.addEventListener("click", hideElement);
  }
  if (btn.textContent == "Add task") {
    console.log(btn)
    btn.addEventListener("click", addTask);
  }
  if (btn.className == "delete") {
    btn.addEventListener("click", deleteElement);
    btn.addEventListener("click", removeStorageItem);
  }
  if (btn.className == "edit") {
    btn.addEventListener("click", editTask);
    
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
  const btnAddProject = create.btn_creator(allElements, "New project");
  const popup_content = create.popEl("project");
  allElements.forEach((el) => popup_content.appendChild(el));
  return { allElements, btnClose, btnAddProject };
}



function defaultCardInput() {
  const allElements = [];
  DomCardInput(allElements)
  const btnClose = create.btn_creator(allElements, "Close");
  const btnAddTask = create.btn_creator(allElements, "Add task");
  const popup_content = create.popEl("card");
  allElements.forEach((el) => popup_content.appendChild(el));
  return { allElements, btnClose, btnAddTask, popup_content };
}

function DomCardInput(allElements) {
  const title = create.txtInput("title", "", allElements);
  const description = create.txtInput("description", "", allElements);
  const dueDate =create.dateInput(allElements);
  const priority = create.priorityInput(allElements);
  const projects = create.projectsSelector(allElements);
  return {title, description, dueDate, priority, projects}
}
/* need new function for all card buttons
  we will use image as button so( if del add )need to change 
  and new function that delete the pop content of the card
  or just check if one exist but is better create new one 
  because the pop html will kind be connect to the card so
  is better delete it.
  and probably delete the current card if confirm was clicked
  and a pop for confirm delete button
  */
function popupToEdit(e) {
  /* const currentText = Array.from(this.children) */
  console.log(e)
  const cardKey = e.parentElement.className.split('-')[1]
  console.log(cardKey)
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
  const btnConfirm = create.btn_creator(allElements, "Confirm");
  const popup_content = create.popEl("edit");
  allElements.forEach((el) => popup_content.appendChild(el));
  return {btnClose, btnConfirm}

}
function clearInputFields(popContent) {
  const t = Array.from(popContent.children);
  t.forEach((i) => (i.value = ""));
}

function updateSelectorOptions() {
  let parent = document.querySelector(".pop-up-content-card");
  let child = document.getElementById("projects");
  let newChild = create.projectsSelector([]);
  parent.replaceChild(newChild, child);
}
function inputCard() {
  const hasPop = document.querySelector(".pop-up-card");
  if (hasPop != null) {
    hasPop.setAttribute("style", "display: block;");
    clearInputFields(hasPop.children[0]);
    updateSelectorOptions();
  } else {
    const inputs = defaultCardInput();
    domEvents(inputs.btnClose);
    domEvents(inputs.btnAddTask);
    clearInputFields(inputs.popup_content);
  }
}
function newProject() {
  const hasPop = document.querySelector(".pop-up-project");
  if (hasPop != null) {
    hasPop.setAttribute("style", "display: block;");
    clearInputFields(hasPop.children[0]);
  } else {
    const inputs = InputElsProject();
    domEvents(inputs.btnClose);
    domEvents(inputs.btnAddProject);
  }
}
/* i think we can make this function the main one to create and del the pop-ups */
function editTask() {
  function createPopEdit(){
    const inputs = popupToEdit(this);
    domEvents(inputs.btnClose);
    domEvents(inputs.btnConfirm);
  }
  const hasPop = document.querySelector(".pop-up-edit");
  if (hasPop != null) {
    hasPop.parentElement.removeChild(hasPop)
    createPopEdit()

  } else {
    createPopEdit() 
  }
}

export { inputCard, newDomCard, newProject, addProject, popupToEdit as editCard};

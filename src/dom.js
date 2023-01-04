import "./style.css";
import createEl from "/src/createElements.js";
import { handleContent,removeStorageItem, updateProjectStorage } from "/src/date-storage-mod.js";
const create = createEl();


function deleteElement() {
  const container = document.querySelector(".card-container");
  const ul = document.querySelector(".list-projects");
  if (this.parentElement.localName == "li") {
    const li = this.parentElement;
    ul.removeChild(li);
    return;
  }
  if (this.textContent == "Delete") {
    const card = this.parentElement;
    container.removeChild(card);
    return;
  }
}
function hideElement(e) {
  const arr = ["pop-up-card", "pop-up-project", "pop-up-content"];
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
  if (btn.textContent == "Delete") {
    btn.addEventListener("click", deleteElement);
    btn.addEventListener("click", removeStorageItem);
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
  const task = document.querySelector(".pop-up-card").children[0];
  const title = document.getElementById("title");
  if (title.value.length > 1 && title.value.length < 20) {
    newDomCard(task.children);
    hideElement(btn);
  }
}
function priorityColor(prioritySelected,el){
  console.log(prioritySelected)
  const colors = {
    'high':'red',
    'mid':'yellow',
    'low':'blue'
  }
  if (prioritySelected.length > 1){
      el.setAttribute('style','border-color:'+colors[prioritySelected])
  }
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
  /* need a function that change the card color with the priority selected */
  els_info.forEach((item) => {
    const el = create.simple_el(item[0], item[1], item[2]);
    card.appendChild(el);
  });

  if (card_input != null) {
    container.removeChild(card_input);
  }

  const btnDel = create.btn_creator([], "Delete");
  card.appendChild(btnDel);
  priorityColor(all_el["priority"],card)
  container.appendChild(card);
  domEvents(btnDel);
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

function defaultCardInput() {
  const allElements = [];

  create.txtInput(
    "title",
    "min: 2 characters, max: 25 characters",
    allElements
  );
  create.txtInput("description", "", allElements);
  create.dateInput(allElements);
  create.priorityInput(allElements);
  create.projectsSelector(allElements);

  const btnClose = create.btn_creator(allElements, "Close");
  const btnAddTask = create.btn_creator(allElements, "Add task");
  const popup_content = create.popEl("card");
  allElements.forEach((el) => popup_content.appendChild(el));

  return { allElements, btnClose, btnAddTask, popup_content };
}
function clearInputFields(popContent) {
  const t = Array.from(popContent.children);
  t.forEach((i) => (i.value = ""));
}

function updateSelectorOptions(){
  let parent = document.querySelector('.pop-up-card').children[0]
  let child = document.getElementById('projects')
  let newChild = create.projectsSelector([]);
  parent.replaceChild(newChild,child)
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

export { inputCard, newDomCard, newProject, addProject };

import "./style.css";
import createEl from "/src/createElements.js";
import {storeContent_changeDate} from "/src/date-mod.js";

const create = createEl();

function removeStorageItem() {
  const itemKey = this.parentElement.className.replace("card-", "");
  sessionStorage.removeItem(itemKey);
}
function deleteElement(e) {
  const container = document.querySelector(".card-container");
  showBtnTask();
  if (this.textContent == 'Delete') {
    /* console.log(e.textContent, "***", this.textContent, this.parentElement,this.parentElement.parentElement); */
    const card = this.parentElement;
    container.removeChild(card);
    return
  }
}
function hideElement (e){
  showBtnTask();
  
  if (e.srcElement == undefined){
    console.log(e.srcElement)
    e.srcElement = e
  }
  if(e.srcElement.parentElement.className == 'pop-up' ){
    e.srcElement.parentElement.parentElement.setAttribute("style", "display: none;");
    return
  }
  if(e.srcElement.parentElement.parentElement.className == 'pop-up'){
    e.srcElement.parentElement.parentElement.setAttribute("style", "display: none;");
    return
  }
}

function domEvents(btn) {
  if (btn.textContent == "Close") {
    btn.addEventListener("click", hideElement);
  }
  if (btn.textContent == "Add task") {
    btn.addEventListener("click",()=> {
      const hasTitle = addContent(btn)
      if(hasTitle == true){
        hideElement(btn)
      }
    });
    
  }
  if (btn.textContent == "Delete") {
    btn.addEventListener("click", deleteElement);
    btn.addEventListener("click", removeStorageItem);
  }
  if (btn.textContent == "New project") {
    btn.addEventListener("click",()=> {
      const hasTitle = addContent(btn)
      if(hasTitle == true){
        hideElement(btn)
      }
    });
    
  }
}

function addProject(txt){
  const ul_projects = document.querySelector('.list-projects')
  const li = document.querySelector('li')
  li.textContent = txt
  ul_projects.appendChild(li)
}
function addContent(e) {
  const card = e.parentElement;
  
  if(card.children[0].value == undefined){
    console.log(card.children[1],card.children[1].value)
    if (card.children[1].value.length > 1) {
      addProject(card.children[1].value)
      return true
    }
  }
  if (card.children[0].value.length > 1) {
    domCard(card.children);
    return true
   
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

  const btnDel = create.btn_creator([], "Delete");
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
function popEl(){
  const content = document.getElementById('content')
  const popup = simple_el('div','pop-up')
  const popup_content = simple_el('div','pop-up-content')
  content.appendChild(popup)
  popup.appendChild(popup_content)
  return popup_content
}
function InputElsProject() {
  const allElements = [];
  allElements.push( create.htmlLabel("Name"));
  create.txtInput('',allElements);
  const btnClose = create.btn_creator(allElements, "Close");
  const btnAddProject = create.btn_creator(allElements,'New project');
  const popup_content = popEl()
  allElements.forEach(el => popup_content.appendChild(el))
  return { allElements, btnClose, btnAddProject };
}
function newProject(){
  const inputs = InputElsProject()
  domEvents(inputs.btnClose);
  domEvents(inputs.btnAddProject);

}
function defaultCardInput() {
  const allElements = [];
  create.txtInput("title", allElements);
  create.txtInput("description", allElements);
  create.dateInput(allElements);
  create.priorityInput(allElements);
  create.projectsSelector(allElements)
  
  const btnClose = create.btn_creator(allElements, "Close");
  const btnAddTask = create.btn_creator(allElements, 'Add task');
  const popup_content = popEl()
  allElements.forEach(el => popup_content.appendChild(el))

  return { allElements, btnClose, btnAddTask };
}

function inputCard() {
  const inputs = defaultCardInput();
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

export { inputCard, domCard, hideBtnTask, newProject};

import "./style.css";
import createEl from "/src/createElements.js";
import {storeContent_changeDate} from "/src/date-mod.js";

const create = createEl();

function removeStorageItem() {
  const itemKey = this.parentElement.className.replace("card-", "");
  sessionStorage.removeItem(itemKey);
}
function deleteElement() {
  const container = document.querySelector(".card-container");
  showBtnTask();
  if (this.textContent == 'Delete') {
    const card = this.parentElement;
    container.removeChild(card);
    return
  }
}
function hideElement (e){
  showBtnTask();
  const arr = ['pop-up-card','pop-up-project','pop-up-content']
  if (e.srcElement == undefined){
    e.srcElement = e
  }
  if(arr.includes(e.srcElement.parentElement.className)){
    e.srcElement.parentElement.parentElement.setAttribute("style", "display: none;");
    return
  }
  if(arr.includes(e.srcElement.parentElement.className)){
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
function updateProjectStorage (){
  const projects = document.querySelector('.list-projects').children
  const keys = Object.keys(sessionStorage)
  if (!keys.includes('projects')){
    sessionStorage['projects'] = 'Personal,'
  }
  const arr_proj =[] 
  Array.from(projects).forEach(p => arr_proj.push(p.textContent))
  sessionStorage['projects'] = arr_proj
}
function addProject(txt){
  const ul_projects = document.querySelector('.list-projects')
  const li = document.createElement('li')
  li.textContent = txt
  ul_projects.appendChild(li)
  updateProjectStorage ()
}
function addContent(e) {
  const card = e.parentElement;
  console.log(card.children[0].value, card.children[0],card.children[1].value)
  if(card.children[0].value == undefined || card.children[0].value == '' ){
    if (card.children[1].value != '' ) {
      addProject(card.children[1].value)
      return true
    }
    else{
      return false
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
function popEl(name){
  const content = document.getElementById('content')
  const popup = simple_el('div','pop-up-'+ name)
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
  const popup_content = popEl('project')
  allElements.forEach(el => popup_content.appendChild(el))
  return { allElements, btnClose, btnAddProject };
}
function newProject(){
  const hasPop = document.querySelector('.pop-up-project')
  console.log(hasPop != null)
  if (hasPop != null){
    hasPop.setAttribute("style", "display: block;")
    clearInputFields(hasPop.children[0])
  }
  else{
    const inputs = InputElsProject()
    domEvents(inputs.btnClose);
    domEvents(inputs.btnAddProject);
  }
  
  

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
  const popup_content = popEl('card')
  allElements.forEach(el => popup_content.appendChild(el))

  return { allElements, btnClose, btnAddTask, popup_content };
}
function clearInputFields(popContent){
  const t = Array.from(popContent.children)
  t.forEach( i => i.value = '')
}

function inputCard() {
  const hasPop = document.querySelector('.pop-up-card')
  console.log(hasPop != null)
  if (hasPop != null){
    hasPop.setAttribute("style", "display: block;")
    
    clearInputFields(hasPop.children[0])
  }
  else {
    const inputs = defaultCardInput();
    domEvents(inputs.btnClose);
    domEvents(inputs.btnAddTask);
    clearInputFields(inputs.popup_content)
  }
  
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

import "./style.css";
import { inputCard, domCard, hideBtnTask, newProject } from "/src/dom.js";
import { objNext7Days, validDate } from "/src/date-mod.js";


function callCard() {
  const addTask = document.querySelector(".add-task");
  addTask.addEventListener("click", () => {
    inputCard();
    hideBtnTask();
  });
}
function callProject() {
  const addProject = document.querySelector(".add-project");
  addProject.addEventListener("click", () => {
    newProject();
    
  });
}

callCard();
callProject()
sideBarProjects()

const today = document.querySelector(".today");
const nxt_seven_days = document.querySelector(".seven-days");
const all_task = document.querySelector(".all-tasks");
all_task.setAttribute("id", "selected");
let allObjTasks = [];
let selected_el = document.getElementById("selected");

function sideBarProjects(){
  const ul_projects = document.querySelector('.list-projects')
  const keys = Object.keys(sessionStorage)
  if (!keys.includes('projects')){
    sessionStorage['projects'] = 'Personal,'
  }
  const all = sessionStorage['projects'].split(',')
  console.log(all)
  all.forEach(txt => {
    console.log(txt)
    const li = document.createElement('li')
    li.textContent = txt 
    ul_projects.appendChild(li)
  })  
}
for (let i of Object.keys(sessionStorage)) {
  if (i != "IsThisFirstTime_Log_From_LiveServer" && i != "objKey" && i != 'projects') {
    let obj = sessionStorage.getItem(i);
    allObjTasks.push(JSON.parse(obj));
  }
}


function allTask (){
  allObjTasks.forEach(item => {
    let isDue = validDate(item['dueDate'],true)
    if (isDue==true){
      item['dueDate'] = 'Due'
    }
    domCard(item)
  });
}
function next7Days() {
  allObjTasks.forEach(item => {
    const obj = objNext7Days();
    if (obj.weekDaysKeys[0]==item["dueDate"]){
        return
    }
    if (obj.weekDaysKeys.includes(item["dueDate"])) {
      domCard(item);
    }
  });
}
function todayTask() {
  allObjTasks.forEach(item => {
    const obj = objNext7Days();
    if (obj.weekDaysKeys[0]==item["dueDate"]) {
      domCard(item);
    }
  });
}

allTask ()
/* next7Days() */
/* todayTask() */



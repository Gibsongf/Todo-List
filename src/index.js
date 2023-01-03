import "./style.css";
import { inputCard, domCard, newProject, addProject} from "/src/dom.js";
import { objNext7Days, validDate } from "/src/date-mod.js";


/* projects event listener */




function eventCreateCard() {
  const addTask = document.querySelector(".add-task");
  addTask.addEventListener("click", inputCard);
}
function eventCreateProject() {
  const adProject = document.querySelector(".add-project");
  adProject.addEventListener("click", newProject);
}

function sideBarProjects() {
  /* const ul_projects = document.querySelector(".list-projects"); */
  const keys = Object.keys(sessionStorage);
  console.log(keys)
  if (!keys.includes("projects")) {
    sessionStorage["projects"] = ["Personal"];
    addProject("Personal")
  }
  if(sessionStorage["projects"].length <1 ){
    return
  } 
  else {
    const all = sessionStorage["projects"].split(",");
    all.forEach((txt) => {
      addProject(txt)
    });
  }
}

function allTask() {
  const allObjTasks = getAllTask();
  allObjTasks.forEach((item) => {
    let isDue = validDate(item["dueDate"], true);
    if (isDue == true) {
      item["dueDate"] = "Due";
    }
    domCard(item);
  });
}
function showAll() {
  const allObjTasks = getAllTask();
  allObjTasks.forEach((item) => {
    document
      .querySelector(".card-" + item["storageKey"])
      .setAttribute("style", "display:block");
  });
}
function showNext7Days(e) {
  const allObjTasks = getAllTask();
  allObjTasks.forEach((item) => {
    const obj = objNext7Days();
    
    if (obj.weekDaysKeys.includes(item["dueDate"])) {
      document
        .querySelector(".card-" + item["storageKey"])
        .setAttribute("style", "display:block");
    } else {
      document
        .querySelector(".card-" + item["storageKey"])
        .setAttribute("style", "display:none");
    }
  });
}

function showTodayTask(e) {
  const allObjTasks = getAllTask();
  allObjTasks.forEach((item) => {
    const obj = objNext7Days();
    /* console.log(obj,item) */
    if (obj.weekDaysKeys[0] != item["dueDate"]) {
      console.log(item["storageKey"]);
      document
        .querySelector(".card-" + item["storageKey"])
        .setAttribute("style", "display:none");
    } else {
      document
        .querySelector(".card-" + item["storageKey"])
        .setAttribute("style", "display:block");
    }
  });
}


function btnActive() {
  let current = document.getElementById("selected");
  if (current != null){
    current.setAttribute("id", "");
    /* console.log(current) */
  }
  this.setAttribute("id", "selected");
  
  
  const obj = {
    'Today':showTodayTask,
    'Next 7 Days':showNext7Days,
    'All Tasks':showAll
  }
  if(Object.keys(obj).includes(this.textContent)){
    obj[this.textContent]()
  }
  else {
    showProject(this.textContent.toLowerCase())
  }
  
}
function getAllTask() {
  let allObjTasks = [];
  for (let i of Object.keys(sessionStorage)) {
    if (
      i != "IsThisFirstTime_Log_From_LiveServer" &&
      i != "objKey" &&
      i != "projects"
    ) {
      let obj = sessionStorage.getItem(i);
      allObjTasks.push(JSON.parse(obj));
    }
  }
  return allObjTasks;
}
function showProject(e){
  const allObjTasks = getAllTask();
  allObjTasks.forEach((item) => {
    if(item['projects'] == e){
      document
        .querySelector(".card-" + item["storageKey"])
        .setAttribute("style", "display:block");

    }
    else {
      document
        .querySelector(".card-" + item["storageKey"])
        .setAttribute("style", "display:none");
    }
  })
}
sideBarProjects();
eventCreateCard();
eventCreateProject();
allTask();
/* need project delete */
const today = document.querySelector(".today");
today.addEventListener("click", btnActive);
const nxt_seven_days = document.querySelector(".seven-days");
nxt_seven_days.addEventListener("click", btnActive);
const all_task = document.querySelector(".all-tasks");
all_task.addEventListener("click", btnActive);
const projects = Array.from(document.querySelector('.list-projects').children)
projects.forEach(p => p.addEventListener("click", btnActive))


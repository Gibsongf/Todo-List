import "./style.css";
import { inputCard, domCard, hideBtnTask } from "/src/dom.js";
import { objNext7Days } from "/src/date-mod.js";

/* sessionStorage.clear() */
function callCard() {
  const addTask = document.querySelector(".add-task");
  addTask.addEventListener("click", () => {
    inputCard();
    hideBtnTask();
  });
}

/*retrieve all task and separate by number*/
/* and create a new module that will use it in conjunction of the side-bar click event */
callCard();
const today = document.querySelector(".today");
const nxt_seven_days = document.querySelector(".seven-days");
const all_task = document.querySelector(".all-tasks");
all_task.setAttribute("id", "selected");

let allObjTasks = [];
let selected_el = document.getElementById("selected");
for (let i of Object.keys(sessionStorage)) {
  if (i != "IsThisFirstTime_Log_From_LiveServer" && i != "objKey") {
    let obj = sessionStorage.getItem(i);
    allObjTasks.push(JSON.parse(obj));
  }
}
const projects = document.querySelector('.list-projects')
console.log(allObjTasks,projects.children)
function allTask (){
  allObjTasks.forEach((item) => domCard(item));
}
function next7Days() {
  allObjTasks.forEach((item) => {
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
  allObjTasks.forEach((item) => {
    const obj = objNext7Days();
    if (obj.weekDaysKeys[0]==item["dueDate"]) {
      console.log(item)
      domCard(item);
    }
  });
}
/* allTask () */
/* next7Days() */
todayTask()
/* all task in the page */



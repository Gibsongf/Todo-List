import "./style.css";
import { inputCard, domCard, hideBtnTask } from "/src/dom.js";

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

function allTask() {
  const container_task =
    document.querySelectorAll(".card"); /* and search local storage use api */
  let all = {};
  let count = 1;
  /* container_task.forEach(task => all[task.children[0].textContent] = task.textContent ) */
  container_task.forEach((task) => {
    let content = {};
    for (let i of task.children) {
      content[i.className] = i.textContent;
    }

    all[count] = content;
    count++;
  });
  return all;
}
const all = allTask();
let allObjTasks = [];
/* func that store the task after the add task btn is clicked 
with the actual date instead of day of the week */
/* all task save to storage as obj that get returned as obj using JSON Module */
/* for (let i of Object.keys(all)) {
  sessionStorage[i] = JSON.stringify(all[i]);
  let obj = sessionStorage.getItem(i);
  allObjTasks.push(JSON.parse(obj));
}

for (let i of Object.keys(sessionStorage)) {
  if (i != 'IsThisFirstTime_Log_From_LiveServer'){
    console.log(i, sessionStorage[i],sessionStorage.length);
  }
} */

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
  /* allObjTasks.push(JSON.parse(obj)); */
}
const all = allTask();
let allObjTasks = [];
let selected_el = document.getElementById('selected')
/* console.log(selected_el) */
console.log(Object.keys(sessionStorage))

for (let i of Object.keys(sessionStorage)) {
  if (i !="IsThisFirstTime_Log_From_LiveServer" && i != 'objKey'){
    let obj = sessionStorage.getItem(i);
    allObjTasks.push(JSON.parse(obj));
  }
}
console.log(allObjTasks,sessionStorage)
allObjTasks.forEach(item => domCard(item))/* all task in the page */

/* func that store the task after the add task btn is clicked 
with the actual date instead of day of the week */


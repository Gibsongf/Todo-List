import "./style.css";
import { createTaskDom, addProject} from "/src/dom.js";
import { objNext7Days, validDate } from "/src/date-storage-mod.js";
import {show_del_popup, askUserName} from '/src/pop-ups.js'
function showEl(item) {
  const toShow = document.querySelector(".card-" + item["storageKey"]);
  toShow.setAttribute("style", "display:block");
  priorityColor(item["priority"], toShow);
}

function hideEl(item) {
  const toShow = document.querySelector(".card-" + item["storageKey"]);
  toShow.setAttribute("style", "display:none");
}

function sideBarProjects() {
  const keys = Object.keys(localStorage);

  if (!keys.includes("projects")) {
    localStorage["projects"] = ["Personal"];
    addProject("Personal");
    return;
  }
  if (localStorage["projects"].length < 1) {
    return;
  } else {
    const all = localStorage["projects"].split(",");
    all.forEach((txt) => {
      addProject(txt);
    });
  }
}

function allTask() {
  const allObjTasks = getAllTask();
  allObjTasks.forEach((item) => {
    let isDue = validDate(item["dueDate"], true);
    if (isDue === true) {
      item["dueDate"] = "Past Task";
    }
    createTaskDom(item);
  });
}

function priorityColor(priority, el) {
  const colors = {
    high: "red",
    mid: "yellow",
    low: "#0cdfd5",
  };
  el.setAttribute("style", "border-color:" + colors[priority]);
}

function showAllTask() {
  const allObjTasks = getAllTask();
  allObjTasks.forEach((item) => {
    showEl(item);
  });
}

function showNext7Days() {
  const allObjTasks = getAllTask();
  allObjTasks.forEach((item) => {
    const obj = objNext7Days();
    if (obj.weekDaysKeys.includes(item["dueDate"])) {
      showEl(item);
    } else {
      hideEl(item);
    }
  });
}

function showTodayTask() {
  const allObjTasks = getAllTask();
  allObjTasks.forEach((item) => {
    const obj = objNext7Days();
    if (obj.weekDaysKeys[0] != item["dueDate"]) {
      hideEl(item);
    } else {
      showEl(item);
    }
  });
}

function getAllTask() {
  let allObjTasks = [];
  for (let i of Object.keys(localStorage)) {
    if (Number(i) >= 0) {/* 0 was not showing without >= 0 */
      let obj = localStorage.getItem(i);
      allObjTasks.push(JSON.parse(obj));
    }
  }
  return allObjTasks;
}

function showProjectTasks(e) {
  const allObjTasks = getAllTask();
  allObjTasks.forEach((item) => {
    if (item["projects"] == e) {
      showEl(item);
    } else {
      hideEl(item);
    }
  });
}

function btnActive() {
  let current = document.getElementById("selected");
  if (current != null) {
    current.setAttribute("id", "");
  }
  this.setAttribute("id", "selected");

  const obj = {
    Today: showTodayTask,
    "Next 7 Days": showNext7Days,
    "All Tasks": showAllTask,
  };
  if (Object.keys(obj).includes(this.innerText)) {
    obj[this.innerText]();
  } else {
    showProjectTasks(this.children[0].textContent.toLowerCase());
  }
}

sideBarProjects();
allTask();
askUserName();

const addTask = document.querySelector(".add-task");
addTask.addEventListener("click", show_del_popup);

const adProject = document.querySelector(".add-project");
adProject.addEventListener("click", show_del_popup);

const menu = Array.from(document.querySelector(".menu").children);
menu.forEach((i) => i.addEventListener("click", btnActive));

const projects = Array.from(
  document.querySelector(".list-projects").children
).slice(1);
projects.forEach((p) => p.addEventListener("click", btnActive));

export { btnActive };

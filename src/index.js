import "./style.css";
import {newDomCard, addProject, show_del_popup} from "/src/dom.js";
import {objNext7Days, validDate} from "/src/date-storage-mod.js";

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
  const keys = Object.keys(sessionStorage);

  if (!keys.includes("projects")) {
    sessionStorage["projects"] = ["Personal"];
    addProject("Personal");
    return;
  }
  if (sessionStorage["projects"].length < 1) {
    return;
  } else {
    const all = sessionStorage["projects"].split(",");
    all.forEach((txt) => {
      addProject(txt);
    });
  }
}

function allTask() {
  const allObjTasks = getAllTask();
  allObjTasks.forEach((item) => {
    let isDue = validDate(item["dueDate"], true);
    if (isDue == true) {
      item["dueDate"] = "Past Task";
    }
    newDomCard(item);
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
    'Today': showTodayTask,
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


const addTask = document.querySelector(".add-task");
addTask.addEventListener("click", show_del_popup);

const adProject = document.querySelector(".add-project");
adProject.addEventListener("click", show_del_popup);

const menu = Array.from(document.querySelector('.menu').children)
menu.forEach(i => i.addEventListener("click", btnActive))

const projects = Array.from(document.querySelector(".list-projects").children).slice(1);
projects.forEach((p) => p.addEventListener("click", btnActive));


export { btnActive };


/* let logoTwo = require('svg-inline-loader?classPrefix=my-prefix-!./imgs/pencil.svg');
const test = document.getElementById('content')
const parser = new DOMParser();
const doc2 = parser.parseFromString(logoTwo, "image/svg+xml");
doc2.documentElement.setAttribute('class','pencil')
test.appendChild(doc2.documentElement) */
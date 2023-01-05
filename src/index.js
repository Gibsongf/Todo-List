import "./style.css";
import { inputCard, newDomCard, newProject, addProject } from "/src/dom.js";
import { objNext7Days, validDate } from "/src/date-storage-mod.js";
import Bullseye from '/src/imgs/bullseye.png'






function sideBarProjects() {
  const keys = Object.keys(sessionStorage);

  if (!keys.includes("projects")) {
    sessionStorage["projects"] = ["Personal"];
    addProject("Personal");
    console.log("20p");
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
    low: "blue",
  };
  el.setAttribute("style", "border-color:" + colors[priority]);
}

function showEl(item) {
  const toShow = document.querySelector(".card-" + item["storageKey"]);
  toShow.setAttribute("style", "display:block");
  priorityColor(item["priority"], toShow);
}

function hideEl(item) {
  const toShow = document.querySelector(".card-" + item["storageKey"]);
  toShow.setAttribute("style", "display:none");
}

function showAllTask() {
  const allObjTasks = getAllTask();
  allObjTasks.forEach((item) => {
    showEl(item);
  });
}

function showNext7Days(e) {
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

function showTodayTask(e) {
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
    Today: showTodayTask,
    "Next 7 Days": showNext7Days,
    "All Tasks": showAllTask,
  };
  if (Object.keys(obj).includes(this.textContent)) {
    obj[this.textContent]();
  } else {
    showProjectTasks(this.children[0].textContent.toLowerCase());
  }
}

sideBarProjects();
allTask();

const addTask = document.querySelector(".add-task");
addTask.addEventListener("click", inputCard);

const adProject = document.querySelector(".add-project");
adProject.addEventListener("click", newProject);

const all_task = document.querySelector(".all-tasks");
all_task.setAttribute("id", "selected");

const menu = Array.from(document.querySelector('.menu').children)
menu.forEach(opt => opt.addEventListener("click", btnActive))
const projects = Array.from(document.querySelector(".list-projects").children);
projects.forEach((p) => p.addEventListener("click", btnActive));

function imgElement(imgSrc,name) {
  const img = document.createElement("IMG");
  img.className = name;
  img.src = imgSrc; 
  return img
}
/* const icon_Today = imgElement(Bullseye,'today-icon')
menu[0].insertBefore(icon_Today, menu[0]) */

export { btnActive };

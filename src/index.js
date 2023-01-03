import "./style.css";
import { inputCard, newDomCard, newProject, addProject } from "/src/dom.js";
import { objNext7Days, validDate } from "/src/date-storage-mod.js";





function sideBarProjects() {
  const keys = Object.keys(sessionStorage);
  
  if (!keys.includes("projects")) {
    sessionStorage["projects"] = ["Personal"];
    addProject("Personal");
    console.log('20p')
    return
  }
  if (sessionStorage["projects"].length < 1) {
    return;
  } else {
    const all = sessionStorage["projects"].split(",");
    console.log(all)
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
function showAllTask() {
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
    if (obj.weekDaysKeys[0] != item["dueDate"]) {
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

const today = document.querySelector(".today");
today.addEventListener("click", btnActive);

const nxt_seven_days = document.querySelector(".seven-days");
nxt_seven_days.addEventListener("click", btnActive);

const all_task = document.querySelector(".all-tasks");
all_task.setAttribute("id", "selected");
all_task.addEventListener("click", btnActive);

const projects = Array.from(document.querySelector(".list-projects").children);
projects.forEach((p) => p.addEventListener("click", btnActive));

export { btnActive };

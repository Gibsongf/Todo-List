import createEl from "/src/createElements.js";
import {
  handleContent,
  removeStorageItem,
  updateProjectStorage,
} from "/src/date-storage-mod.js";
import { show_del_popup } from "/src/pop-ups.js";

const create = createEl();

function deleteElement() {
  const container = document.querySelector(".card-container");
  const ul = document.querySelector(".list-projects");
  if (this.parentElement.localName == "li") {
    const li = this.parentElement;
    ul.removeChild(li);
    return;
  } else {
    const card = this.parentElement.parentElement;
    container.removeChild(card);
    return;
  }
}
function hideElement(e) {
  e.setAttribute("style", "display: none;");
}

function priorityColor(priority, el) {
  const colors = {
    high: "red",
    mid: "yellow",
    low: "#0cdfd5",
  };
  el.setAttribute("style", "border-color:" + colors[priority]);
}

function domEvents(btn) {
  const obj = {
    Close: hideElement,
    "Add task": addContent,
    Confirm: [clickDel, addContent],
    "New project": addContent,
    delete: [deleteElement, removeStorageItem],
    edit: show_del_popup,
  };
  let btnName = "";

  function checkParentEl() {
    if (btn.parentElement.parentElement.parentElement.id == "content") {
      obj[btnName](btn.parentElement.parentElement);
    } else {
      obj[btnName](btn.parentElement.parentElement.parentElement);
    }
  }

  if (Object.keys(obj).includes(btn.textContent)) {
    btnName = btn.textContent;
  }
  if (Object.keys(obj).includes(btn.className)) {
    btnName = btn.className;
  }
  if (btnName == "Close") {
    btn.addEventListener("click", checkParentEl);
    return;
  }
  if (typeof obj[btnName] == "object") {
    obj[btnName].forEach((doIt) => btn.addEventListener("click", doIt));
    return;
  } else {
    btn.addEventListener("click", obj[btnName]);
    return;
  }
}
function clickDel() {
  const key = this.id.split("-")[1];
  const task = document.querySelector(".card-" + key);
  const delBtn = task.children[3].children[0];
  delBtn.click();
}

function addProject(txt) {
  function warn_limit_project() {
    const ul_projects = document.querySelector(".list-projects");
    if (ul_projects.children.length >= 6) {
      const warning = create.popEl("warning");
      const txt = create.simple_el("h3", "", "Limit of projects are 5.");
      const btnClose = create.btn_creator([], "Close");
      warning.popup_content.appendChild(txt);
      warning.popup_content.appendChild(btnClose);
      btnClose.setAttribute("style", "margin:0 auto");
      domEvents(btnClose);
      return true;
    }
  }

  const limit = warn_limit_project();
  if (limit == true) {
    return;
  }
  const ul_projects = document.querySelector(".list-projects");
  const li = document.createElement("li");
  const div = create.simple_el("div", "", txt);

  li.appendChild(div);
  ul_projects.appendChild(li);
  updateProjectStorage();

  const btnDel = create.btnDel(true);
  li.appendChild(btnDel);
  domEvents(btnDel);
}

function addContent(btn) {
  const task = btn.srcElement.parentElement.parentElement;
  const btnParent = task.className.split("-")[3];
  const title = task.children[1].value;
  if (btnParent == "project") {
    if (title.length > 1 && title.length < 15) {
      addProject(title);
      hideElement(task.parentElement);
    }
  }
  if (title.length > 1 && btnParent != "project" && title.length < 15) {
    createTaskDom(task.children);
    hideElement(task.parentElement);
  }
}

function createTaskDom(elChildren) {
  const card_input = document.querySelector(".card-input");
  const container = document.querySelector(".card-container");
  let all_el = handleContent(elChildren);
  const card = create.simple_el("div", "card-" + all_el["storageKey"]);
  card.setAttribute("id", "task-holder");
  const els_info = [
    ["h2", "title", all_el["title"]],
    ["h3", "dueDate", all_el["dueDate"]],
    ["h3", "description", all_el["description"]],
  ];

  els_info.forEach((item) => {
    const el = create.simple_el(item[0], item[1], item[2]);
    card.appendChild(el);
  });

  function btnStuffs() {
    const btnDel = create.btnDel();
    const btnEdit = create.btnEdit();
    const btn = create.simple_el("div", "btn-card-container");
    btn.appendChild(btnDel);
    btn.appendChild(btnEdit);
    card.appendChild(btn);
    domEvents(btnDel);
    domEvents(btnEdit);
  }

  function clickSelectedId() {
    /* this avoid the card showing at the wrong place when created*/
    const selectID = document.getElementById("selected");
    if (selectID == null) {
      const all = document.querySelector(".all-tasks");
      all.setAttribute("id", "selected");
      all.click();
    } else {
      selectID.click();
    }
  }

  if (card_input != null) {
    container.removeChild(card_input);
  }
  btnStuffs();
  priorityColor(all_el["priority"], card);
  container.appendChild(card);
  clickSelectedId();
}

export { createTaskDom, addProject, domEvents };

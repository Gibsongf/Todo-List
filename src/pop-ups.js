import createEl from "/src/createElements.js";
import { domEvents } from "/src/dom.js";
const create = createEl();

function askUserName() {
  function hideElement(e) {
    e.setAttribute("style", "display: none;");
  }
  const h4 = document.querySelector(".user-name").children[1];
  if (localStorage["user-name"] === undefined) {
    popupName();
  } else {
    h4.textContent = localStorage["user-name"];
  }
  function popupName() {
    const allElements = [];
    const txt = create.txtInput("name", "max 10 characters", allElements);
    const btnConfirm = create.btn_creator(allElements, "Confirm");
    const two_popUp = create.popEl("user-name");
    allElements.forEach((el) => two_popUp.popup_content.appendChild(el));
    btnConfirm.addEventListener("click", confirmName);
    btnConfirm.setAttribute("style", "margin:0 auto");

    function confirmName() {
      const promptName = document.querySelector(".pop-up-user-name");
      if (txt.value.length <= 10 && txt.value.length > 2) {
        let name = txt.value;
        name = name[0].toUpperCase() + name.slice(1);
        h4.textContent = name;
        hideElement(promptName);
        localStorage["user-name"] = name;
      }
    }
  }
}

function btn_Container(btnAddName) {
  const btnContainer = create.simple_el("div", "btn-container");
  const btnClose = create.btn_creator([], "Close");
  const btnAdd = create.btn_creator([], btnAddName);
  btnContainer.appendChild(btnClose);
  btnContainer.appendChild(btnAdd);
  return { btnContainer, btnClose, btnAdd };
}

function askProjectName() {
  const allElements = [];
  create.txtInput("name", "", allElements);
  const btn = btn_Container("New project");
  const two_popUp = create.popEl("project");
  allElements.forEach((el) => two_popUp.popup_content.appendChild(el));
  two_popUp.popup_content.appendChild(btn.btnContainer);
  return btn;
}

function showEditPopup(e) {
  const cardKey = e.parentElement.parentElement.className.split("-")[1];
  const allElements = [];
  const all_inputs = taskInputsEl(allElements);
  const obj = JSON.parse(localStorage[cardKey]);

  Object.keys(obj).forEach((key) => {
    if (key != "stored" && key != "storageKey") {
      all_inputs[key].value = obj[key];
    }
  });
  const btn = btn_Container("Confirm");
  btn.btnAdd.setAttribute("id", "key-" + cardKey);
  const two_popUp = create.popEl("edit");
  allElements.forEach((el) => two_popUp.popup_content.appendChild(el));
  two_popUp.popup_content.appendChild(btn.btnContainer);
  return btn;
}

function askTaskInfo() {
  const allElements = [];
  taskInputsEl(allElements);
  const btn = btn_Container("Add task");
  const two_popUp = create.popEl("card");
  allElements.forEach((el) => two_popUp.popup_content.appendChild(el));
  two_popUp.popup_content.appendChild(btn.btnContainer);
  return btn;
}

function taskInputsEl(allElements) {
  const title = create.txtInput(
    "title",
    "min 2 characters, max 15",
    allElements
  );
  const description = create.txtInput(
    "description",
    "min 2 characters",
    allElements
  );
  const dueDate = create.dateInput(allElements);
  const priority = create.priorityInput(allElements);
  const projects = create.projectsSelector(allElements);
  return { title, description, dueDate, priority, projects };
}

/* manager pop-ups */
function show_del_popup() {
  const btnClicked = this;
  let keyName = this.className.split("-");
  if (keyName.length > 1) {
    keyName = keyName[1];
  } else {
    keyName = keyName[0];
  }
  console.log(keyName)
  const obj = {
    edit: showEditPopup,
    project: askProjectName,
    task: askTaskInfo,
  };

  function delPop(popName) {
    if (popName == "task") {
      popName = "card";
    }
    const hasPop = document.querySelector(".pop-up-" + popName);
    if (hasPop != null) {
      hasPop.parentElement.removeChild(hasPop);
    }
  }
  delPop(keyName);
  if (keyName == "edit") {
    const btn = obj[keyName](btnClicked);
    domEvents(btn.btnClose);
    domEvents(btn.btnAdd);
  } else {
    const btn = obj[keyName]();
    domEvents(btn.btnClose);
    domEvents(btn.btnAdd);
  }
}

export { show_del_popup, askUserName };

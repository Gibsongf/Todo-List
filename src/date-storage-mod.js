const { format, parseISO, addDays, isBefore } = require("date-fns");
import { btnActive } from "/src/index.js";

function validDate(userDate, fromStorage) {
  const result = isBefore(parseISO(userDate), parseISO(todayDate()));
  if (fromStorage == true) {
    if (result == true) {
      return true;
    }
    if (result == false) {
      return userDate;
    }
  }
  if (result == true) {
    return todayDate();
  }
  if (result == false) {
    return userDate;
  }
}

function objNext7Days() {
  let days = [0, 1, 2, 3, 4, 5, 6, 7];
  let currentDay = todayDate();
  let dateDict = {};

  for (let n of days) {
    let ad = addDays(parseISO(currentDay), n);
    let arr_date = format(new Date(ad), "yyyy-MM-dd EEEE").split(" ");
    dateDict[arr_date[0]] = arr_date[1];

  }
  let weekDaysKeys = Object.keys(dateDict);
  dateDict[weekDaysKeys[0]] = "Today";
  dateDict[weekDaysKeys[1]] = "Tomorrow";
  return { dateDict, weekDaysKeys };
}

function checkWeekDayName(taskDate) {
  taskDate = validDate(taskDate);
  if (typeof taskDate == "undefined") {
    taskDate = todayDate();
  }
  const objs = objNext7Days();

  if (objs.weekDaysKeys.includes(taskDate)) {
    return objs.dateDict[taskDate];
  } else {
    return taskDate;
  }
}
function todayDate() {
  const currentDay = format(new Date(), "yyyy-MM-dd");
  return currentDay;
}

function elementToObj(elem) {
  let obj = {};
  let arr = Array.from(elem).filter(unnecessaryEls);
  arr.forEach((item) => (obj[item.id] = item.value));

  function unnecessaryEls(el) {
    if (el.localName != "label" && el.localName != "div") {
      if (el.id == "dueDate" || el.value.length > 1) {
        return el;
      }

      if (el.localName == "select" && el.children[0] != undefined) {
        if (el.children.length < 1) {
          return;
        }

        el.value = el[0].value;
        return el;
      }
    }
  }
  return obj;
}

function createKey_storeContent(contentObj) {
  let newKeyNumber = localStorage.getItem("objKey");
  if (typeof newKeyNumber != "string") {
    localStorage.setItem("objKey", 0);
  } else {
    localStorage.setItem("objKey", ++newKeyNumber);
  }
  contentObj["storageKey"] = localStorage["objKey"];
  contentObj["stored"] = true;
  localStorage[localStorage["objKey"]] = JSON.stringify(contentObj);
}

function storeTask(contentObj, storeContent) {
  if (contentObj["dueDate"].length > 1) {
    if (storeContent == true) {
      createKey_storeContent(contentObj);
    }
    contentObj["dueDate"] = checkWeekDayName(contentObj["dueDate"]);
  } else {
    contentObj["dueDate"] = todayDate();
    if (storeContent == true) {
      createKey_storeContent(contentObj);
      storeTask(contentObj);
    }
  }
}

function handleContent(lst) {
  let obj = elementToObj(lst);

  if (lst["stored"] == true) {
    storeTask(lst);
    return lst;
  }

  storeTask(obj, true);
  return obj;
}

function removeStorageItem() {
  if (this.parentElement.localName == "li") {
    const li = this.parentElement.children[0];
    let arr = localStorage["projects"].split(",");
    let indx = arr.filter((ar) => ar != li.textContent);
    localStorage["projects"] = indx;
    return;
  }
  const itemKey = this.parentElement.parentElement.className.replace("card-", "");
  localStorage.removeItem(itemKey);
}
function updateProjectStorage() {
  const projects = Array.from(document.querySelector(".list-projects").children).slice(1);
  const arr_proj = [];
  projects.forEach((p) => {
    arr_proj.push(p.children[0].textContent);
    p.addEventListener("click", btnActive);
  });
  localStorage["projects"] = arr_proj;
}

export { handleContent, updateProjectStorage, objNext7Days, validDate, removeStorageItem, elementToObj };

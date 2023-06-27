import { btnActive } from "/src/index.js";
import { format, parseISO, addDays, isBefore } from "date-fns";
function validateDate(userDate, fromStorage) {
    const result = isBefore(parseISO(userDate), parseISO(todayDate()));
    if (fromStorage) {
        if (result) {
            return true;
        } else {
            return userDate;
        }
    }
    if (result) {
        return true;
    } else {
        return userDate;
    }
}

function getNext7DaysObject() {
    const days = [0, 1, 2, 3, 4, 5, 6, 7];
    const currentDay = todayDate();
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
    taskDate = validateDate(taskDate);
    const objs = getNext7DaysObject();
    if (objs.weekDaysKeys.includes(taskDate)) {
        return objs.dateDict[taskDate];
    } else {
        let arr = String(parseISO(taskDate)).split(" ").slice(1, 4);
        return arr.join("/");
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
    if (typeof newKeyNumber !== "string") {
        localStorage.setItem("objKey", "0");
    } else {
        localStorage.setItem("objKey", String(++newKeyNumber));
    }
    contentObj["storageKey"] = localStorage.getItem("objKey");
    contentObj["stored"] = true;
    localStorage.setItem(
        localStorage.getItem("objKey"),
        JSON.stringify(contentObj)
    );
}

function storeTask(contentObj, storeContent) {
    if (contentObj["dueDate"].length > 1) {
        if (storeContent === true) {
            createKey_storeContent(contentObj);
        }
        contentObj["dueDate"] = checkWeekDayName(contentObj["dueDate"]);
    } else {
        contentObj["dueDate"] = todayDate();
        if (storeContent === true) {
            createKey_storeContent(contentObj);
            storeTask(contentObj);
        }
    }
}

function handleContent(lst) {
    let obj = elementToObj(lst);

    if (lst["stored"] === true) {
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
    const itemKey = this.parentElement.parentElement.className.replace(
        "card-",
        ""
    );
    localStorage.removeItem(itemKey);
}
function updateProjectStorage() {
    const projects = Array.from(
        document.querySelector(".list-projects").children
    ).slice(1);
    const arr_proj = [];
    projects.forEach((project) => {
        arr_proj.push(project.children[0].textContent);
        project.addEventListener("click", btnActive);
    });
    localStorage["projects"] = arr_proj;
}

export {
    handleContent,
    updateProjectStorage,
    getNext7DaysObject as objNext7Days,
    validateDate as validDate,
    removeStorageItem,
    elementToObj,
};
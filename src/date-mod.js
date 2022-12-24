function date_or_weekday() {
  const {
    format,
    parseISO,
    formatDistanceToNowStrict,
    intlFormat,
    addDays,
    addMonths,
  } = require("date-fns");

  function addDays_currentDate(distance, currentDate) {
    const currentDay = format(new Date(), "yyyy-MM-dd");
    let intDistance = Number(distance.split(" ")[0]);
    const distanceName = distance.split(" ")[1];
    const obj = {
      days: addDays,
      day: addDays,
      months: addMonths,
      month: addMonths,
    };

    if (currentDate == currentDay) {
      console.log(currentDate, currentDate == currentDay, currentDay);
      return true;
    }

    if (distanceName == "hours") {
      intDistance = 1;
      let nextWeekDay = "Tomorrow";
      return { weekDayName: nextWeekDay, intDistance };
    }

    if (distanceName == "day" || distanceName == "days") {
      intDistance += 1;
    }

    const date_number = obj[distanceName](parseISO(currentDay), intDistance);
    /* console.log(date_number) */
    const fDate = intlFormat(date_number, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "long",
    });
    let weekDayName = fDate.split(",")[0];
    const nextDate = fDate.split(",")[1].trim();

    if (distanceName == "month" || distanceName == "months") {
      /* console.log(distanceName) */
      intDistance = 30;
    }
    return { weekDayName, nextDate, intDistance, currentDay };
  }
  /* return the actual date to store and the date to show in the page */
  function checkDistance(taskDate) {
    const distance = formatDistanceToNowStrict(new Date(taskDate));
    const formateDate = addDays_currentDate(distance, taskDate);
    if (formateDate == true) {
      return "Today";
    }

    if (formateDate.intDistance == 7) {
      return "Next " + formateDate.weekDayName;
    }
    if (formateDate.intDistance > 7) {
      return formateDate.nextDate;
    }
    if (formateDate.intDistance < 7) {
      console.log("week day name", taskDate);
      return formateDate.weekDayName;
    }
  }
  function todayDate() {
    const currentDay = format(new Date(), "yyyy-MM-dd");
    return currentDay;
  }
  return { checkDistance, todayDate };
}
export default date_or_weekday;

/* let test = date_or_weekday()
console.log(test.checkDistance('2022-12-26')) */

function storageManage() {
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
  for (let i of Object.keys(all)) {
    sessionStorage[i] = JSON.stringify(all[i]);
    let obj = sessionStorage.getItem(i);
    allObjTasks.push(JSON.parse(obj));
  }

  for (let i of Object.keys(sessionStorage)) {
    if (i != "IsThisFirstTime_Log_From_LiveServer") {
      console.log(i, sessionStorage[i], sessionStorage.length);
    }
  }
}

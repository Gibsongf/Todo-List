function date_or_weekday() {
  const {
    format,
    parseISO,
    formatDistanceToNowStrict,
    intlFormat,
    addDays,
    isBefore
  } = require("date-fns");

  function addDays_currentDate(distance, currentDate) {
    const currentDay = format(new Date(), "yyyy-MM-dd");
    let intDistance = Number(distance.split(" ")[0]);
    const distanceName = distance.split(" ")[1];
    /* console.log(`Distance${distance}, Current Date:${currentDate}`) */
    if (currentDate == currentDay) {
      /* console.log(currentDate, currentDate == currentDay, currentDay); */
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

    const date_number = addDays(parseISO(currentDay), intDistance);
    const fDate = intlFormat(date_number, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "long",
    });
    let weekDayName = fDate.split(",")[0];
    const nextDate = fDate.split(",")[1].trim();

    return { weekDayName, nextDate, intDistance, currentDay };
  }
  function setMinDate(userDate){
/*     console.log(`task date :${userDate} || current day ${todayDate()}`)
 */ const result = isBefore(parseISO(userDate), parseISO(todayDate()))
    /* console.log(userDate,todayDate(),result,userDate) */
    if (result==true){
      return todayDate()
    }
    if(result==false){
      return userDate
    }
  }
  
  /* return the actual date to store and the date to show in the page */
  function checkDistance(taskDate) {

    taskDate = setMinDate(taskDate)
    console.log(taskDate)
    const distance = formatDistanceToNowStrict(new Date(taskDate));
    let distanceName = distance.split(' ')
    let formateDate = '';
    console.log(`Task Date ${taskDate}, Distance: ${distance}  `)
    if (distanceName[1] == 'month' || distanceName[1] == 'months'){
      return taskDate
    }
    if (distanceName[1] == 'days' && Number(distanceName[0] > 7 )){
      console.log( 'asdkadçl')
      return taskDate
    }
    else {
      formateDate = addDays_currentDate(distance, taskDate);
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
        /* console.log("week day name", taskDate); */
        return formateDate.weekDayName;
      }
      
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

  function store_changeData(lst) {
    let obj = {};
    console.log(lst)
    function emptyDate (date){
      if (date.length > 1) {
        const newDate = checkDate.checkDistance(date);
        return newDate
        
      } 
      else {
        const newDate = checkDate.todayDate();
        return newDate  
      }
      
    }
    
    for (let i of lst) {
      if (i.localName != "label") {
          /* console.log(`id:${i.id}, value:${i.value.length}`); */
          obj[i.id] = i.value;
        }
      }
    
    /* Remove empty values */
    for (let i of Object.keys(obj)) {
      if (obj[i].length < 1) {
        delete obj[i];
      }
    }
    console.log(obj['dueDate'])
  
    sessionStorage[sessionStorage.length] = JSON.stringify(obj);
    obj['dueDate'] = emptyDate(obj['dueDate'])
    console.log(obj['dueDate'])
    return obj;
  }

  
  function storeOneTask (){
    sessionStorage[sessionStorage.length] = JSON.stringify(obj);
    console.log(sessionStorage)
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

/* 
function allTask() {
  const container_task =
    document.querySelectorAll(".card"); and search local storage use api
  let all = {};
  let count = 1;
  container_task.forEach(task => all[task.children[0].textContent] = task.textContent )
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
 */
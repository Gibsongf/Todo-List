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
      return { nextWeekDay, intDistance };
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
    let nextWeekDay = fDate.split(",")[0];
    const nextDate = fDate.split(",")[1].trim();

    if (distanceName == "month" || distanceName == "months") {
      /* console.log(distanceName) */
      intDistance = 30;
    }
    return { nextWeekDay, nextDate, intDistance, currentDay };
  }

  function checkDistance(taskDate) {
    const distance = formatDistanceToNowStrict(new Date(taskDate));
    const formateDate = addDays_currentDate(distance, taskDate);
    if (formateDate == true) {
      return "Today";
    }

    if (formateDate.intDistance == 7) {
      return "Next " + formateDate.nextWeekDay;
    }
    if (formateDate.intDistance > 7) {
      return formateDate.nextDate;
    }
    if (formateDate.intDistance < 7) {
      console.log("week day name", taskDate);
      return formateDate.nextWeekDay;
    }
  }
  return { checkDistance };
}
export default date_or_weekday;

/* let test = date_or_weekday()
console.log(test.checkDistance('2022-12-26')) */

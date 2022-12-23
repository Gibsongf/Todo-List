function date_or_weekday() {
    const {
      format,
      addDays,
      parseISO,
      formatDistanceToNow,
      intlFormat,
    } = require("date-fns");
   /* let taskDate = "2022-12-30"; */  
    function currentDate() {
      const result = format(new Date(), "yyyy-MM-dd,EEEE");
      let currentDay = result.split(",")[0];
      let weekDayName = result.split(",")[1];
      return { currentDay, weekDayName };
    }
  
    function checkDistance(taskDate) {
      const formateDate = currentDate();
      const day_distance = formatDistanceToNow(new Date(taskDate));
      const days = Number(day_distance.split(" ")[0]) ;
      /* need fix the exact time that will pass or all the return value will be wrong */
      console.log(days);
      /* if (days == 7) {
        console.log(day_distance, "ddd");
        return "Next " + formateDate.weekDayName;
      } */
      if (days > 7) {
        let date_number = addDays(parseISO(formateDate.currentDay), days);
        const fDate = intlFormat(date_number, {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        console.log("date-number", fDate);
        return fDate;
      }
      if (days <= 7) {
        console.log("week day name", formateDate.weekDayName);
        return formateDate.weekDayName;
      }
    }
    return {checkDistance};
  }
export default date_or_weekday
/* 
let test = date_or_weekday('2022-12-30')
console.log(test.checkDistance()) */
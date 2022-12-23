import "./style.css";
import { inputCard, domCard, hideBtnTask } from "/src/dom.js";

function callCard() {
  const addTask = document.querySelector(".add-task");
  addTask.addEventListener("click", () => {
    inputCard();
    hideBtnTask();
  });
}
/* Make a function that retrieve all task and separate by date */
/* and create a new module that will use it in conjunction of the side-bar click event */
function allTask (){
    const container_task = document.querySelectorAll('.card')/* and search local storage use api */
    let all =  {}
    /* container_task.forEach(task => all[task.children[0].textContent] = task.textContent ) */
    container_task.forEach(task => {
        let content = {}
        for(let i of task.children){
          /* console.log(i.className) */
          content[i.className] = i.textContent
          /* console.log(content) */
        }
        console.log('-------------------------')
        all[task.children[1].textContent] = content
    })
    console.log(all)

    
    return all
}
/* function will see the due date and 
if the date is more than 7 days just put the date (30 dez) 
else just the day of the week  */
callCard()
const all = allTask()
const today = document.querySelector('.today')
today.setAttribute('id','selected')
const nxt_seven_days = document.querySelector('.seven-days')
const all_task = document.querySelector(".all-tasks")
const ul = document.querySelector('ul')
/* const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; */
const {format} = require('date-fns');
const result = format(new Date(), 'MM/dd/yyyy, EEEE')

console.log(result)

/* let test = [] */
/* all task save to storage as obj that get returned as obj using JSON Module
for (let i of Object.keys(all)){
    console.log(i)

    sessionStorage[i] = JSON.stringify (all[i]);
    let a = sessionStorage.getItem(i)
    test.push(JSON.parse(a))
    console.log(a)
}
console.log(test) */
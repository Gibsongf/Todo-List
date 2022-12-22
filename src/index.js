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
    const container_task = document.querySelectorAll('.card')
    for (let i of container_task){
        console.log(i)
    }
}
allTask()

callCard()
console.log(Date())


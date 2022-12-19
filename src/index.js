import "./style.css";
import Tasks from '/src/index copy.js'


function t (){
    const task = Tasks()
    task.domForm()
    console.log(task.form)
    task.form.addEventListener('submit',(e)=>{
        e.preventDefault();
    })
    task.addForm()

}


const addTask = document.querySelector('.add-task');
addTask.addEventListener('click',t)

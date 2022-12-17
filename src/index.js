import "./style.css";



function htmlLabel (contentName){
    const label = document.createElement('label');
    label.textContent = contentName;
    label.setAttribute('id',contentName.toLowerCase())
    label.htmlFor = contentName.toLowerCase();
    return label
}
function txtInput (txt, parent){
   const label = htmlLabel(txt)
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = txt
    if (txt == 'Title'){
        input.required = true;
    }
    input.setAttribute('id',txt)
    parent.appendChild(label)
    parent.appendChild(input)
    return input
}
function dateInput (parent){
    const label = htmlLabel('dueDate');
    const input = document.createElement('input');
    input.type = 'date';
    input.setAttribute('id','dueDate')
    input.min  = '2023-01-01'/* Here we use api to use today date */
    parent.appendChild(label)
    parent.appendChild(input)
    return input
}
function selectOption (optValue,select){
    const opt = document.createElement('option');
    opt.value = optValue.toLowerCase();
    opt.textContent = optValue;
    select.appendChild(opt);
    return opt
}
function priorityInput(parent){
    const label = htmlLabel ('Priority')
    const input = document.createElement('select');
    input.setAttribute('id','priority')

    selectOption('High', input);
    selectOption('Mid', input);
    selectOption('Low', input);

    parent.appendChild(label)
    parent.appendChild(input)

    return input
}
function close (parent){
    const btnClose = document.createElement('button');
    btnClose.textContent = 'X'
    parent.appendChild(btnClose)
    btnClose.addEventListener('click',btnCancel)

}
function btnTask(){
    const content = document.getElementById('content');
    const add_task = document.createElement('button');
    add_task.className = 'add-task';
    add_task.textContent = 'Add task';
    add_task.addEventListener('click',elCard);
    content.appendChild(add_task);

}

function btnSubmit (parent){
    const btn = document.createElement('button')
    btn.type = 'submit'
    btn.textContent = 'Add task'
    parent.appendChild(btn)
    return btn
}
function elCard(){
    const form = document.createElement('form');
    const card = document.createElement('div');
    card.className = 'card'
    const title = txtInput ('Title', form)
    const description = txtInput ('Description', form)
    const dueDate = dateInput (form)
    const priority = priorityInput(form)
    close(card)
    btnSubmit(form)
    card.appendChild(form)
    content.appendChild(card)
    hideEl(this)
    
}


function showEl (el){
    el.setAttribute('style','display: block;')
}
function hideEl (el){
    el.setAttribute('style','display: none;')
}
function btnCancel (){
    const card = this.parentElement
    const content = card.parentElement
    content.removeChild(card)
    showEl(document.querySelector('.add-task'))
} 
btnTask()
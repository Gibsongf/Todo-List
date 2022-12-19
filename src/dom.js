import "./style.css";




function htmlLabel (contentName){
    const label = document.createElement('label');
    label.textContent = contentName + ':';
    label.setAttribute('id',contentName.toLowerCase())
    label.htmlFor = contentName.toLowerCase();
    return label
}
function txtInput (txt,arr){
    /* const label = htmlLabel(txt) */
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = txt
    if (txt == 'Title'){
        input.required = true;
    }
    input.setAttribute('id',txt)
    /* arr.push(label); */
    arr.push(input);
    return input
}
function dateInput (arr){
    const label = htmlLabel('dueDate');
    const input = document.createElement('input');
    input.type = 'date';
    input.setAttribute('id','dueDate')
    input.min  = '2023-01-01'/* Here we use api to use today date */

    arr.push(label);
    arr.push(input);
    
    return input
}
function selectOption (optValue,select){
    const opt = document.createElement('option');
    opt.value = optValue.toLowerCase();
    opt.textContent = optValue;
    select.appendChild(opt)
    return opt
}
function priorityInput(arr){
    const label = htmlLabel ('Priority')
    const input = document.createElement('select');
    input.setAttribute('id','priority')

    selectOption('High', input);
    selectOption('Mid', input);
    selectOption('Low', input);
    
    arr.push(label);
    arr.push(input);
    return input
}
function close (arr){
    const btnClose = document.createElement('button');
    btnClose.textContent = 'Close'
    arr.push(btnClose);
    return btnClose

}

function btnAdd (arr){
    const btn = document.createElement('button')
    btn.textContent = 'Add task'
    arr.push(btn);
    return btn
}
function removeElement (e){
    const container = document.querySelector('.card-container');
    if (e.textContent === undefined){
        const card = this.parentElement
        container.removeChild(card)
    }
    else {
        const parent = e.parentElement
        parent.removeChild(e)
    }
    
    showEl(document.querySelector('.add-task'))
}

/* function domEvents (btn){
    if (btn.textContent == 'Close'){
        btn.addEventListener('click',removeElement)
    }
    if (btn.textContent == 'Add task'){
        btn.addEventListener('click',addtsk)
    }
}
function addtsk (){
    const card = this.parentElement
    if (card.children[0].value.length > 1){
        console.log(card.children[0].value)
    }
}
 */
function simple_el (type,selector_name,innerContent){
    const ell = document.createElement(type);
    ell.className = selector_name;
    ell.textContent = innerContent;
    return ell
  }


function showEl (el){
    el.setAttribute('style','display: block;')
}

function hideEl (el){
    el.setAttribute('style','display: none;')
}

function cardTemplate(){
    const card = document.createElement('div');
    card.className = 'card'

    const container = document.querySelector('.card-container')
    const allElements = []
    const title = txtInput ('Title',allElements)
    const description = txtInput ('Description',allElements)
    const dueDate = dateInput (allElements)
    const priority = priorityInput(allElements)
    const btnClose = close(allElements)
    const btnAddTask = btnAdd(allElements)
    
    allElements.forEach(obj => card.appendChild(obj))
    container.appendChild(card)
    let just_input = allElements.filter(word => word.localName == 'input'|| word.localName == 'select');
    let obj = {}
    just_input.forEach(input => obj[input.id] = input)
    return obj
    
}


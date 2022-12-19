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
function close (){
    const btnClose = document.createElement('button');
    btnClose.textContent = 'Close'
    return btnClose

}

function btnSubmit (){
    const btn = document.createElement('button')
    btn.type = 'submit'
    btn.textContent = 'Add task'
    return btn
}
function removeElement (e){
    const container = document.querySelector('.card-container');
    if (e.textContent === undefined){
        const card = this.parentElement.parentElement
        container.removeChild(card)
    }
    else {
        const parent = e.parentElement
        parent.removeChild(e)
    }
    

    showEl(document.querySelector('.add-task'))
}

function domEvents (btn){
    if (btn.textContent == 'Close'){
        btn.addEventListener('click',removeElement)
    }
    if (btn.textContent == 'Add task'){
        btn.addEventListener('click',addtsk)
    }
}
function addtsk (){
    const form = this.parentElement
    const card = form.parentElement
    domCard(form,card)
    removeElement(form)
}
function simple_el (type,selector_name,innerContent){
    const ell = document.createElement(type);
    ell.className = selector_name;
    ell.textContent = innerContent;
    return ell
  }
  function domCard (form,parent){
    
    const today = simple_el('h2','today-date','TODAY DATE')
    const title = simple_el('h3','title',form[0].value)
    const description = simple_el('h4','description',form[1].value)
    const dueDate = simple_el('h4', 'dueDate',form[2].value)
    const priority = simple_el('h4', 'priority', form[3].value)
    let arr = [today,title,description,dueDate,priority]
    arr.forEach(html => parent.appendChild(html))
}


function showEl (el){
    el.setAttribute('style','display: block;')
}

function hideEl (el){
    el.setAttribute('style','display: none;')
}

function createForm(){
    /* all elements created goes here to append all together  */
    const allElements = []
    const card = document.createElement('div');
    card.className = 'card'
    
    const container = document.querySelector('.card-container')

    function domForm(){
        const title = txtInput ('Title',allElements)
        const description = txtInput ('Description',allElements)
        const dueDate = dateInput (allElements)
        const priority = priorityInput(allElements)
        const btnClose = close()
        const btnAddTask = btnSubmit()
        allElements.forEach(obj => form.appendChild(obj))
        domEvents(btnClose)
        domEvents(btnAddTask)
        
        
    }

    function addForm(){
        card.appendChild(form)
        container.appendChild(card)
        
    }
    function formContentObj(form){
        const obj = 
        {'title':form[0].value,
        'description':form[1].value,
        'dueDate':form[2].value,
        'priority':form[3].value}
        return obj
    }
   
    return {addForm,formContentObj,form,domForm}
    
}

export default createForm
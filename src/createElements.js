/* const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; */
/* decide if will be week day in the card or the date number(MM-dd-yyyy) */


function createEl() {
  const { format } = require("date-fns");
  const currentDate = format(new Date(), "MM-dd-yyyy");

  function dateInput(arr) {
    const label = htmlLabel("dueDate");
    const input = document.createElement("input");
    input.type = "date";
    input.setAttribute("id", "dueDate");
    input.min = currentDate; /* Here we use api to use today date */

    arr.push(label);
    arr.push(input);

    return input;
  }
  function htmlLabel(contentName) {
    const label = document.createElement("label");
    label.textContent = contentName + ":";
    label.setAttribute("id", contentName.toLowerCase());
    label.htmlFor = contentName.toLowerCase();
    return label;
  }
  function txtInput(txt, arr) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = txt;
    if (txt == "title") {
      input.required = true;
    }

    input.setAttribute("id", txt);
    arr.push(input);
    return input;
  }

  function selectOption(optValue, select) {
    const opt = document.createElement("option");
    opt.value = optValue.toLowerCase();
    opt.textContent = optValue;
    select.appendChild(opt);
    return opt;
  }
  function priorityInput(arr) {
    const label = htmlLabel("Priority");
    const input = document.createElement("select");
    input.setAttribute("id", "priority");
  
    const slc = selectOption("High", input);
    selectOption("Mid", input);
    selectOption("Low", input);

    arr.push(label);
    arr.push(input);
    return input;
  }
  function projectsSelector(arr) {
    const label = htmlLabel("My Projects");
    const input = document.createElement("select");
    input.setAttribute("id", "projects");

    const projects = Array.from(document.querySelector('.list-projects').children)
    projects.forEach(li => selectOption(li.textContent,input))

    arr.push(label);
    arr.push(input);
    return input;
  }
  function btn_creator(arr,txt) {
    const btnClose = document.createElement("button");
    const idName = txt.replace(txt[0],txt[0].toLowerCase())
    btnClose.textContent = txt;
    btnClose.setAttribute("id", idName);
    arr.push(btnClose);
    return btnClose;
  }

  
  const everything = {

    btn_creator,
    priorityInput,
    selectOption,
    txtInput,
    htmlLabel,
    dateInput,
    projectsSelector
  };
  return Object.assign({}, everything);
}
export default createEl;

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
    if (txt == "Title") {
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

    selectOption("High", input);
    selectOption("Mid", input);
    selectOption("Low", input);

    arr.push(label);
    arr.push(input);
    return input;
  }
  function btn_close(arr) {
    const btnClose = document.createElement("button");
    btnClose.textContent = "Close";
    btnClose.setAttribute("id", "close");
    arr.push(btnClose);
    return btnClose;
  }

  function btnAdd(arr) {
    const btn = document.createElement("button");
    btn.textContent = "Add task";
    btn.setAttribute("id", "add-card");
    arr.push(btn);
    return btn;
  }
  const everything = {
    btnAdd,
    btn_close,
    priorityInput,
    selectOption,
    txtInput,
    htmlLabel,
    dateInput,
  };
  return Object.assign({}, everything);
}
export default createEl;

function createEl() {
  const { format } = require("date-fns");
  const currentDate = format(new Date(), "MM-dd-yyyy");

  function dateInput(arr) {
    const label = htmlLabel("dueDate");
    const input = document.createElement("input");
    input.type = "date";
    input.setAttribute("id", "dueDate");
    input.min = currentDate;
    arr.push(label);
    arr.push(input);

    return input;
  }
  function htmlLabel(contentName) {
    const label = document.createElement("label");
    let newName = contentName[0].toUpperCase() + contentName.slice(1);
    label.textContent = newName + ":";
    label.htmlFor = contentName.toLowerCase();
    return label;
  }
  function txtInput(name, pHolder, arr) {
    const label = htmlLabel(name);
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = pHolder;
    if (name == "title" || name == "name") {
      input.required = true;
    }
    name = name.replace(" ", "-").toLowerCase();
    input.setAttribute("id", name);
    arr.push(label);
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
    selectOption("Low", input);
    selectOption("Mid", input);
    selectOption("High", input);

    arr.push(label);
    arr.push(input);
    return input;
  }
  function projectsSelector(arr) {
    const label = htmlLabel("My Projects");
    const input = document.createElement("select");
    input.setAttribute("id", "projects");

    const projects = Array.from(
      document.querySelector(".list-projects").children
    );
    projects.forEach((li) => selectOption(li.children[0].textContent, input));

    arr.push(label);
    arr.push(input);
    return input;
  }
  function btn_creator(arr, txt) {
    const btnClose = document.createElement("button");
    const idName = txt.replace(txt[0], txt[0].toLowerCase());
    btnClose.textContent = txt;
    btnClose.setAttribute("id", idName);
    arr.push(btnClose);
    return btnClose;
  }
  function simple_el(type, selector_name, innerContent) {
    const ell = document.createElement(type);
    if (selector_name.length > 1) {
      ell.className = selector_name;
    }
    ell.textContent = innerContent;
    return ell;
  }
  function popEl(name) {
    const content = document.getElementById("content");
    const popup = simple_el("div", "pop-up-" + name);
    const popup_content = simple_el("div", "pop-up-content");
    content.appendChild(popup);
    popup.appendChild(popup_content);
    return popup_content;
  }

  const everything = {
    simple_el,
    popEl,
    btn_creator,
    priorityInput,
    selectOption,
    txtInput,
    htmlLabel,
    dateInput,
    projectsSelector,
  };
  return Object.assign({}, everything);
}
export default createEl;

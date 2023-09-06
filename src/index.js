import { format } from "date-fns";
import { populateData } from "./loadData";

populateData();
const projects = JSON.parse(localStorage.getItem("projects"));
const content = document.querySelector('#content');
const projectList = document.createElement('ul');
projects.forEach(project => {
    const todolist = document.createElement('ul');
    const projName = document.createElement('li');
    projName.textContent = project.name;
    projName.classList.add('projName');
    projectList.appendChild(projName);
    project["toDoList"].forEach(element => {
        const todo = document.createElement('li');
        todo.textContent = element.title + ' Date: '+ element.dueDate; 
        todolist.append(todo);
    });
    projectList.appeChild(todolist);
});
content.appendChild(projectList);



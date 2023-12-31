import { format } from 'date-fns';
import * as projects from './project';
import Project from './project';
import ToDo from './toDo';

const content = document.querySelector('#content');
const actions = document.querySelector('#actions');

export function populateData() {
  // create projects/todos and loads them on localStorage
  const projects = [];
  const todos = []; 

  const actions = [
    'Do dishes',
    'Paint house',
    'Brush teeth',
    'Drive kids',
    'Do groceries',
    'Clean sheets',
  ];

  actions.forEach((element) => {
    for (let index = 0; index < 2; index++) {
      const mytodo = new ToDo(
        element,
        element,
        format(randomDate(new Date(), new Date(2023, 9, 6)), 'P'),
        'high',
      );
      todos.push(mytodo);
    }
  });

  const when = ['Today', 'This Week', 'This Month', 'Next Month'];
  when.forEach((element) => {
    const myproj = new Project(element);
    todos.forEach((todo) => {
      myproj.addToDo(todo);
    });
    projects.push(myproj);
  });

  localStorage.setItem('projects', JSON.stringify(projects));
}
let allprojects = JSON.parse(localStorage.getItem('projects'));

export function loadMenu() {
  const projectSelector = document.createElement('select');
  projectSelector.setAttribute('id', 'projectSelector');
  populateProjectSelector(projectSelector);
  actions.append('Projects: ', projectSelector);
  projectSelector.addEventListener('change', () => {
    if (projectSelector.value == 'all') {
      const myvar = JSON.parse(localStorage.getItem('projects'));
      loadProjects(myvar);
    } else {
      const selectedProject = projects.getProjectByName(projectSelector.value);
      loadProjects(selectedProject);
    }
  });

  const buttonNewProject = document.createElement('button');
  buttonNewProject.classList.add('btnDetails');
  buttonNewProject.textContent = 'New Project';
  buttonNewProject.addEventListener('click', () => {
    projects.newProject(prompt('choose project name'));
    allprojects = JSON.parse(localStorage.getItem('projects'));
    populateProjectSelector(projectSelector);
    loadProjects(allprojects);
  });

  const buttonNewTask = document.createElement('button');
  buttonNewTask.classList.add('btnDetails');
  buttonNewTask.textContent = 'New Task';
  buttonNewTask.addEventListener('click', () => {
    newTask();
    console.log('clicked');
  });

  actions.append(buttonNewProject, buttonNewTask);
  loadProjects(allprojects);
}

function populateProjectSelector(selectorItem) {
  selectorItem.innerHTML = '';
  const option1 = document.createElement('option');
  option1.setAttribute('value', 'all');
  option1.textContent = 'All';
  selectorItem.appendChild(option1);
  allprojects.forEach((project) => {
    const optionX = document.createElement('option');
    optionX.setAttribute('value', project.name);
    optionX.textContent = project.name;
    selectorItem.appendChild(optionX);
  });
}

function newTask() {
  const taskModal = document.createElement('div');
  taskModal.classList.add('modal', 'actionModal');
  // taskModal.innerHTML = "New Task";

  const taskForm = newTaskForm();
  taskForm.classList.add('taskForm');

  const closeButton = document.createElement('span');
  closeButton.classList.add('close');
  closeButton.innerHTML = '&times;';

  const addTask = document.createElement('span');
  addTask.classList.add('addtask');
  addTask.innerHTML = 'Add Task';

  taskForm.appendChild(addTask);
  taskModal.appendChild(taskForm);
  taskModal.append(closeButton);
  content.append(taskModal);

  closeButton.addEventListener('click', () => {
    taskModal.style.display = 'none';
  });

  addTask.addEventListener('click', () => {
    const title = document.querySelector('#taskTitle');
    const desc = document.querySelector('#taskDescription');
    const dueDate = document.querySelector('#dueDate');
    const project = document.querySelector('#taskProjectSelector');
    projects.addTaskToProject(
      title.value,
      desc.value,
      dueDate.value,
      project.value,
    );
    taskModal.style.display = 'none';
    allprojects = JSON.parse(localStorage.getItem('projects'));
    loadProjects(allprojects);
  });
}

function newTaskForm() {
  const myForm = document.createElement('form');
  myForm.setAttribute('id', 'taskForm');
  const taskTitle = document.createElement('input');
  taskTitle.setAttribute('type', 'text');
  taskTitle.setAttribute('id', 'taskTitle');
  taskTitle.setAttribute('placeholder', 'Title');

  const taskDescription = document.createElement('input');
  taskDescription.setAttribute('type', 'textarea');
  taskDescription.setAttribute('id', 'taskDescription');
  taskDescription.setAttribute('placeholder', 'Description');

  const dueDate = document.createElement('input');
  dueDate.setAttribute('type', 'date');
  dueDate.setAttribute('id', 'dueDate');
  dueDate.setAttribute('placeholder', 'Due Date');
  const dueDateLabel = document.createElement('label');
  dueDateLabel.setAttribute('for', 'dueDate');
  dueDateLabel.textContent = 'Due Date:';

  const projectSelector = document.createElement('select');
  projectSelector.setAttribute('id', 'taskProjectSelector');
  populateProjectSelector(projectSelector);
  projectSelector.remove(0);
  const projectLabel = document.createElement('label');
  projectLabel.setAttribute('for', 'taskProjectSelector');
  projectLabel.textContent = 'Project:';

  myForm.append(
    projectLabel,
    projectSelector,
    taskTitle,
    taskDescription,
    dueDateLabel,
    dueDate,
  );

  return myForm;
}

export function loadProjects(projects) {
  // returns an ul with all projects and its todos

  const projectList = document.createElement('ul');
  projectList.classList.add('projectList');
  projects.forEach((project) => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('projectDiv');
    const projName = document.createElement('li');
    projName.textContent = project.name;
    projName.classList.add('projName');
    projectDiv.appendChild(projName);
    const myarray = project.toDoList;
    projectDiv.appendChild(loadTodos(myarray));
    projectList.appendChild(projectDiv);
  });
  content.innerHTML = '';
  content.append(projectList);
  return projectList;
}

function loadTodos(todoList) {
  // loads and print todo list of a project
  const todolist = document.createElement('ul');
  todolist.classList.add('todoList');
  todoList.forEach((element) => {
    const todo = document.createElement('li');
    todo.innerHTML = `Task: <br>${element.title.toUpperCase()}<br>Due Date: <br>${
      element.dueDate
    }`;
    todo.classList.add('todoShortDescription');
    const btnDetails = document.createElement('button');
    btnDetails.classList.add('btnDetails');
    btnDetails.setAttribute('id', todoList.indexOf(element));
    btnDetails.textContent = 'Details';
    todo.appendChild(btnDetails);
    todolist.append(todo);
    btnDetails.addEventListener('click', function () {
      loadTodoDetail(
        element,
        this.parentNode.parentNode.previousSibling.textContent,
      );
    });
  });
  return todolist;
}
function loadTodoDetail(todo, projectName) {
  // opens modal with todo detail and actions
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = projectName;
  const closeButton = document.createElement('span');
  closeButton.classList.add('close');
  closeButton.innerHTML = '&times;';

  const modalText = document.createElement('ul');
  modalText.classList.add('modalText');
  Object.entries(todo).forEach((element) => {
    const line = document.createElement('li');
    line.classList.add('modalLine');
    line.textContent = `${element[0].toUpperCase()} : ${element[1]}`;
    modalText.append(line);
  });

  const deleteButton = document.createElement('span');
  deleteButton.classList.add('delete');
  deleteButton.innerHTML = 'Delete Task';

  modal.append(modalText, deleteButton, closeButton);
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  deleteButton.addEventListener('click', () => {
    projects.deleteToDo(todo.title, projectName);
    projectSelector.value = projectName;
    loadProjects(projects.getProjectByName(projectName));
    modal.style.display = 'none';
  });

  content.append(modal);
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

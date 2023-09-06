import {format} from 'date-fns';
import Project from './project';
import ToDo from './toDo';

const date = new Date (1990,5,12);


const mytodo = new ToDo('Lavar','lavar la ropa', date,'high');
const mytodo2 = new ToDo('Planchar','planchar la ropa', date,'high');
const mytodo3 = new ToDo('Colgar','colgar la ropa', date,'high');
const myProject = new Project('Tareas');
myProject.addToDo(mytodo);
myProject.addToDo(mytodo2);
myProject.addToDo(mytodo3);
console.log(myProject);
myProject.deleteToDo(mytodo2);
console.log(myProject.getToDoList());

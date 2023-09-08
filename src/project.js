export default class Project {
  constructor(name) {
    this.name = name;
    this.toDoList = [];
  }

  addToDo(toDo) {
    this.toDoList.push(toDo);
  }
}
export function getProjectByName(projName) {
  const projects = JSON.parse(localStorage.getItem("projects"));
  let res = [];
  projects.forEach((element) => {
    if (element.name == projName) {
      res.push(element);
    }
  });
  return res;
}

export function deleteToDo(todotodelete, projectName) {
  const projects = JSON.parse(localStorage.getItem("projects"));
  projects.forEach((element) => {
    if (element.name == projectName) {
      element.toDoList.forEach((todo, index) => {
        if (todo.title == todotodelete) {
          console.table(element.toDoList);
          element.toDoList.splice(index, 1);
          console.table(element.toDoList);
        }
      });
    }
  });
  localStorage.setItem("projects", JSON.stringify(projects));
}
export function newProject(projectName) {

  const projects = JSON.parse(localStorage.getItem("projects"));
  const myproj = new Project(projectName);
  projects.push(myproj);
  localStorage.setItem("projects", JSON.stringify(projects));
  
  

}

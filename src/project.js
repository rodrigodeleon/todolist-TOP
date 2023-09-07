export default class Project {
  constructor(name) {
    this.name = name;
    this.toDoList = [];
  }

  getToDoList() {
    return this.toDoList;
  }

  addToDo(toDo) {
    this.toDoList.push(toDo);
  }
}

export function deleteToDo(todotodelete, projectName) {
  const projects = JSON.parse(localStorage.getItem("projects"));
  projects.forEach((element) => {
    if (element.name == projectName) {
      element.toDoList.forEach((todo , index) => {
        if (todo.title == todotodelete) {
          console.table(element.toDoList);
          // const toDoToDeleteIndex = element.toDoList.indexOf(todotodelete);
          element.toDoList.splice(index, 1);
          console.table(element.toDoList);
        }
      });
    }
  });
  localStorage.setItem("projects", JSON.stringify(projects));
}

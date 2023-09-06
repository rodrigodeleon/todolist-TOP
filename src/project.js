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

  deleteToDo(toDoToDeleteIndex) {
    this.toDoList.splice(toDoToDeleteIndex, 1);
  }
}

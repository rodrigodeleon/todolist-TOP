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

  deleteToDo(toDoToDelete) {
    this.toDoList.forEach((toDo) => {
      if (toDo.title == toDoToDelete.title) {
        let index = this.toDoList.indexOf(toDo);
        this.toDoList.splice(index, 1);
      }
    });
  }
}

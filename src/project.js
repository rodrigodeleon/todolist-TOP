export default class Project {
  constructor(name) {
    this.name = name;
    this.toDoList = [];
  }
}

export function getToDoList() {
  return toDoList;
}

export function addToDo(toDo)
{
    this.toDoList.push(toDo);
}

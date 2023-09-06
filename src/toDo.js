import { format } from "date-fns";

export default class ToDo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = format(dueDate, "P");
    this.priority = priority;
    this.checked = false;
  }

  checkUncheck() {
    this.checked ? (this.checked = false) : (this.checked = true);
  }
  getDueDate() {
    let date = this.dueDate;
    return frmat(date, "P");
  }
}

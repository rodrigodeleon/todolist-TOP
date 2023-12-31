import { format } from 'date-fns';

export default class ToDo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    // this.dueDate = format(dueDate, "P");
    this.dueDate = dueDate;
    this.priority = priority;
    this.checked = false;
  }

  checkUncheck() {
    this.checked ? (this.checked = false) : (this.checked = true);
  }

  getDueDate() {
    const date = this.dueDate;
    return format(date, 'P');
  }
}

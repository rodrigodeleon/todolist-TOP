import { compareAsc, format } from 'date-fns/format';

export default class toDo {

    constructor (title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }


}
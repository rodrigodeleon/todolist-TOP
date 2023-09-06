import * as Project from './project';
import * as toDo from './toDo';
import { compareAsc, format } from 'date-fns/format';

let dates = [new Date(1990,5,12),new Date(1950,4,20),new Date(1924,8,22)];
console.log(dates.sort(compareAsc));
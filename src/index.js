import { loadAllProjects , populateData} from "./loadData";
import './style.css';

const content = document.querySelector('#content');
populateData();
loadAllProjects();


import { loadAllProjects } from "./loadData";
import './style.css';

const content = document.querySelector('#content');

content.append(loadAllProjects());


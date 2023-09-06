import { loadAllProjects } from "./loadData";

const content = document.querySelector('#content');

content.append(loadAllProjects());


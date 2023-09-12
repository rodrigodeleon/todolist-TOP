import { loadMenu, populateData } from './loadData.js';
import { getProjectByName } from './project';
import './style.css';

const content = document.querySelector('#content');
const actions = document.querySelector('#actions');

populateData();
loadMenu();

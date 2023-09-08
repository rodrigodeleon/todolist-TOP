import { loadMenu, populateData } from "./loadData";
import "./style.css";
import * as projects from "./project";

const content = document.querySelector("#content");
const actions = document.querySelector("#actions");
const allprojects = JSON.parse(localStorage.getItem("projects"));
populateData();
loadMenu();

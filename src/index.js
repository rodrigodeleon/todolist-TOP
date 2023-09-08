import { loadMenu, populateData } from "./loadData";
import "./style.css";

const content = document.querySelector("#content");
const actions = document.querySelector("#actions");

populateData();
loadMenu();

const selectElem = (elem, parent = document) => parent.querySelector(elem, parent);
const selectALLElem = (elem, parent = document) => parent.querySelectorAll(elem, parent);
const createElem = (elem) => document.createElement(elem);

function normalizeDate(time){
    let date = new Date(time);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return day + '.' + month + '.' + year;
}
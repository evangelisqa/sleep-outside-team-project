// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get a search parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// render an HTML list using a template string function
export function renderListWithTemplate(templateFunction, parentElement, list, position = "afterbegin", clear = false) {
  // generate the string array with the template function
  const listStrings = list.map(templateFunction);
  // clear out the parent element if desired
  if (clear) {
    parentElement.innerHTML = "";
  }
  // insert the string array into the desired position within the parent element
  parentElement.insertAdjacentHTML(position, listStrings.join(""));
}
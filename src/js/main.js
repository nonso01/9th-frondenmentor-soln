"use strict"
const [_D, _W, log] = [document, window, console]

const [html, body] = [dq("html"), dq("body")]


/**
 * on - a function that adds multiple events to the selected element(s)
 * @param { type: string} element 
 * @param {type: object} event 
 */
function on(element = "", event = {}) {
 for (let key in event) {
  const e = document.querySelectorAll(element)
  e.forEach(el => el.addEventListener(key, event[key]))
 }
}

function dq(x) {
  return _D.querySelector(x)
}
function dqA(x) {
  return _D.querySelectorAll(x)
}


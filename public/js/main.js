/* Sidebar */
const sidebar = document.getElementById("sidebar");
const sidebarToggler = document.querySelector(".sidebar_toggler");

// Toggling the Sidebar
sidebarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

// Closing the Sidebar on clicking Outside and on the Sidebar-Links
window.addEventListener("click", (e) => {
  if (e.target.id !== "sidebar" && e.target.className !== "sidebar_toggler") {
    sidebar.classList.remove("show");
  }
});

import controlTagDOM from "./emulation/control.tagdom.js";

/* The code is creating a socket connection using the `io()` function, which is likely provided by a
library like Socket.io. */
const socket = io();

const BenchMeasurement = new controlTagDOM(
  "screen-element",
  "toogle-element",
  "slider-element",
  "#MCU",
  "#sensor",
  "button-element",
  socket
);
const alertMCU = document.getElementById("LAN-MCU");
const alertServer = document.getElementById("server");

/* The code snippet is defining event listeners for the "connect" and "disconnect" events emitted by
the socket. */
socket.on("connect", () => {
  alertServer.hide();
});

/* The code snippet `socket.on("disconnect", () => {
  alertServer.show();
});` is setting up an event listener for the "disconnect" event emitted by the socket connection.
When the socket connection is disconnected, the callback function is executed, and it calls the
`show()` method on the `alertServer` element. This action is likely intended to display an alert or
message to the user indicating that the server connection has been lost. */
socket.on("disconnect", () => {
  alertServer.show();
});


/* The code snippet is defining an event listener for the "status" event emitted by the socket. When
the "status" event is received, the callback function is executed with the "message" parameter. */
socket.on("conections-all", (arrayMCU) => {
  let verifyMCU = true;
  arrayMCU.forEach(element => {
    if (element.status === "OFF") {
      verifyMCU = false;
    }
  });
  if (verifyMCU) {
    alertMCU.hide();
    BenchMeasurement.addEventListenerToogle();
  } else {
    alertMCU.show();
  }
});

const LOG_IN = document.querySelector("modal-login");
const LOG_OUT = document.getElementById("login-Out");
const CRUD_IN = document.querySelector("modal-register");
const CRUD_OUT = document.getElementById("CRUD-Out");
const CONFIG_IN = document.querySelector("modal-config");
const CONFIG_OUT = document.getElementById("config-Out");

/* The code snippet `LOG_OUT.addEventListener("click", (event) => {
  localStorage.removeItem("username");
  LOG_IN.show();
});` is setting up an event listener for a click event on an element with the id `LOG_OUT`. When
this element is clicked, it performs the following actions:
1. Removes the item with the key "username" from the localStorage, effectively clearing the stored
username.
2. Calls the `show()` method on the `LOG_IN` element, presumably to display a login modal or form. */
LOG_OUT.addEventListener("click", (event) => {
  localStorage.removeItem("username");
  LOG_IN.show();
});

/* The code snippet `CRUD_OUT.addEventListener("click", (event) => {
  CRUD_IN.show();
});` is setting up an event listener for a click event on an element with the id `CRUD_OUT`. When
this element is clicked, it performs the following action: */
CRUD_OUT.addEventListener("click", (event) => {
  CRUD_IN.show();
});

/* The code snippet `CONFIG_OUT.addEventListener("click", (event) => {
  CONFIG_IN.show();
});` is setting up an event listener for a click event on an element with the id `CONFIG_OUT`. When
this element is clicked, it triggers the `show()` method on the `CONFIG_IN` element. This means that
when the user clicks on the element associated with `CONFIG_OUT`, it will display or show the
content or modal represented by the `CONFIG_IN` element. */
CONFIG_OUT.addEventListener("click", (event) => {
  CONFIG_IN.show();
});

/* This code snippet is adding an event listener to the `window` object for the "DOMContentLoaded"
event. When the DOM content of the page is fully loaded and parsed, the function inside the event
listener is executed. Here's a breakdown of what the code is doing: */
window.addEventListener("DOMContentLoaded", function () {
  var username = localStorage.getItem("username");
  LOG_IN.connect = socket;
  CRUD_IN.connect = socket;
  CONFIG_IN.connect = socket;
  //CRUD_IN.show();
  //CRUD_IN.hide();
  if (username) {
    LOG_IN.hide();
  } else {
    LOG_IN.show();
  }
});


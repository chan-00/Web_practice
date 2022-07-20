const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const helloName = document.getElementById("greeting");

const HIDDEN_CLASSNAME = "hidden";
const USER_KEYNAME = "username";

function printHello(username) {
  helloName.classList.remove(HIDDEN_CLASSNAME);
  helloName.innerHTML = `Hello ${username}`;
}

function handleLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const inputValue = loginInput.value;
  localStorage.setItem(USER_KEYNAME, inputValue);
  printHello(inputValue);
}

//loginForm.addEventListener("submit", handleLoginSubmit);
const localUsername = localStorage.getItem(USER_KEYNAME);

if(localUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", handleLoginSubmit);
} else {
  printHello(localUsername);
}

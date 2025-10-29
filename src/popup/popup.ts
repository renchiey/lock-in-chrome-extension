import { isLockInActive, toggleLockIn } from "../background.js";

const button = document.getElementById("lock-in-toggle");

if (isLockInActive()) {
  button?.classList.add("btn-active");
} else {
  button?.classList.add("btn-inactive");
}

button?.addEventListener("click", () => {
  console.log("hello");
  if (isLockInActive()) {
    button.classList.remove("btn-active");
    button.classList.add("btn-inactive");
  } else {
    button.classList.remove("btn-inactive");
    button.classList.add("btn-active");
  }

  toggleLockIn();
});

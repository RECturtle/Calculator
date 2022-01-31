const buttons = document.querySelectorAll(".btn");
const screen = document.querySelector(".number");
const operandButtons = document.querySelectorAll(".op-btn");
const equals = document.querySelector(".eq-btn");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const decimalBtn = document.querySelector(".dot-btn");
let first;
let second;
let operand;
let resetNow = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    addNumber(button.textContent);
  });
});

operandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setOps(button.textContent);
  });
});

equals.addEventListener("click", () => {
  total();
});

clearBtn.addEventListener("click", () => {
  clearScreen();
  resetNums();
});

deleteBtn.addEventListener("click", () => {
  removeNumber();
});

decimalBtn.addEventListener("click", () => {
  if (decCheck(screen.textContent)) {
    addNumber(".");
  }
});

function addNumber(num) {
  if (screen.textContent === "0" || resetNow) {
    screen.textContent = "";
    resetNow = false;
  }

  if (screen.textContent.length >= 16) {
    return;
  }

  screen.textContent += num;
}

function removeNumber() {
  screen.textContent = screen.textContent.slice(0, -1);
}

function setOps(op) {
  if (operand) {
    first = operate(first, screen.textContent, operand);
  } else {
    first = screen.textContent;
  }
  resetNow = true;
  operand = op;
}

function total() {
  second = screen.textContent;
  if (second === "0" && operand === "÷") {
    alert("Don't divide by 0 fool.");
  } else {
    screen.textContent = operate(first, second, operand);
  }
  resetNums();
}

function operate(num1, num2, operand) {
  num1 = Number(num1);
  num2 = Number(num2);

  switch (operand) {
    case "+":
      return rounder(add(num1, num2));
    case "-":
      return rounder(subtract(num1, num2));
    case "×":
      return rounder(multiply(num1, num2));
    case "÷":
      return rounder(divide(num1, num2));
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function rounder(num) {
  num = Math.round(num * 1000) / 1000;

  if (num.toString().length >= 16) {
    return num.toExponential(4);
  }
  return num;
}

function clearScreen() {
  screen.textContent = 0;
}

function resetNums() {
  first = "";
  second = "";
  operand = "";
}

function decCheck(currNumber) {
  if (currNumber.includes(".")) {
    return false;
  }
  return true;
}

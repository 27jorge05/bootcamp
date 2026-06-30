const operationElement = document.querySelector("#operation");
const resultElement = document.querySelector("#result");
const keysElement = document.querySelector(".keys");

let expression = "";

const operators = ["+", "-", "*", "/"];

function showExpression() {
  operationElement.textContent = formatForScreen(expression);
  resultElement.textContent = expression === "" ? "0" : formatForScreen(expression);
}

function formatForScreen(value) {
  return value
    .replaceAll("*", "×")
    .replaceAll("/", "÷")
    .replaceAll("-", "−");
}

function addValue(value) {
  const lastCharacter = expression.at(-1);

  if (value === "." && currentNumberHasDecimal()) {
    return;
  }

  if (operators.includes(value) && expression === "") {
    return;
  }

  if (operators.includes(value) && operators.includes(lastCharacter)) {
    expression = expression.slice(0, -1) + value;
    showExpression();
    return;
  }

  expression += value;
  showExpression();
}

function currentNumberHasDecimal() {
  const parts = expression.split(/[+\-*/]/);
  const currentNumber = parts.at(-1);

  return currentNumber.includes(".");
}

function clearCalculator() {
  expression = "";
  showExpression();
}

function deleteLastCharacter() {
  expression = expression.slice(0, -1);
  showExpression();
}

function applyPercent() {
  if (expression === "") {
    return;
  }

  expression = String(Number(calculateExpression(expression)) / 100);
  showExpression();
}

function calculate() {
  if (expression === "" || operators.includes(expression.at(-1))) {
    return;
  }

  const answer = calculateExpression(expression);
  expression = String(answer);
  operationElement.textContent = "";
  resultElement.textContent = expression;
}

function calculateExpression(value) {
  return Function(`"use strict"; return (${value})`)();
}

keysElement.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const value = button.dataset.value;
  const action = button.dataset.action;

  if (value) {
    addValue(value);
    return;
  }

  if (action === "clear") {
    clearCalculator();
  }

  if (action === "delete") {
    deleteLastCharacter();
  }

  if (action === "percent") {
    applyPercent();
  }

  if (action === "calculate") {
    calculate();
  }
});

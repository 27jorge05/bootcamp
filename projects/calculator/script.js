const operationElement = document.getElementById('operation');
const resultElement = document.getElementById('result');
const keysElement = document.querySelector('.keys');

let expression = '';

const operators = ['+', '-', '*', '/'];

// auxiliars functions 

function isValidExpression(expression) {
    const hasNumber = /[0-9]/.test(expression)
    const hasConsecutiveOperators = /[+\-*/]{2,}/.test(expression)
    const hasOperatorAtEnd = operators.includes(expression.at(-1))
    const hasconsecutiveDots = /\.{2,}/.test(expression)
    return hasNumber && !hasConsecutiveOperators && !hasOperatorAtEnd && !hasconsecutiveDots;
}

// wrongs
function  redScreen () {
    const screen = document.querySelector('.screen');
    screen.classList.add('invalid');

    setTimeout(() => {
        screen.classList.remove('invalid');
    }, 180);

}
// screen
function formatForScreen(value) {
    return value
        .replaceAll('*', '×')
        .replaceAll('/', '÷')
        .replaceAll('-', '−');

}

function showExpression() {
    console.log(`Expression: ${expression}`);
    operationElement.textContent = formatForScreen(expression);
}
function showResult(expression) {
    if (expression === '') {
        resultElement.textContent = '0';
    } else {
        resultElement.textContent = formatForScreen(expression);
    }
}
function currentNumberHasDecimal() {
    const parts = expression.split(/[/\*+/-]/);
    const currentNumber = parts.at(-1);
    return currentNumber.includes('.');
}
function addValue(value) {
    const lastCharacter = expression.at(-1);

    if ((value === '.' && currentNumberHasDecimal()) ||
        (operators.includes(value) && expression === '') ||
        (operators.includes(value) && operators.includes(lastCharacter))) {
        redScreen();
        return;
    }
    expression += value;
    showExpression();
}

// operators
function clearCalculator() {
    expression = '';
    showExpression();
}
function deleteLastCharacter() {
    expression = expression.slice(0, -1);
    showExpression();
}
function applyPercent() {

    if (isValidExpression(expression) ) {
        expression = (eval(expression) / 100).toString();
        showExpression();
    }
}
function calculate() {
    if (isValidExpression(expression)) {
        expression = eval(expression).toString();
        showResult(expression);
    }
}


keysElement.addEventListener('click', (event) => {
    console.log(`Event target: ${event.target.tagName}`);
    const button = event.target.closest('button');
    const value = button.dataset.value;
    const action = button.dataset.action;
    console.log(`Value: ${value}, Action: ${action}`);
    if (value) {
        addValue(value);
        console.log(`Value added: ${value}`);
        return;
    }
    if (action === 'clear') {
        clearCalculator();
    }
    if (action === 'delete') {
        deleteLastCharacter();
    }
    if (action === 'percent') {
        applyPercent();
    }
    if (action === 'equals') {
        calculate();
    }

});
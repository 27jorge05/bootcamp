
const operatorScreen = document.getElementById('operation');
const operationElement = document.getElementById('operation');
const resultElement = document.getElementById('result');
const keysElement = document.querySelector('.keys');
const historyElement = document.querySelector('.history');

let history = JSON.parse(localStorage.getItem('history')) || [];
let expression = '';
let justCalculated = false;

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
function redScreen() {
    const screen = document.querySelector('.screen');
    screen.classList.add('invalid');

    setTimeout(() => {
        screen.classList.remove('invalid');
    }, 180);

}
// screen
function formatForScreen(value) {
    return String(value)
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
    const isNumber = /[0-9]/.test(value);
    if (justCalculated && isNumber) {
        expression = '';
        showResult(expression);
    }
    justCalculated = false;
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
    showResult(expression);
    showExpression();

}
function deleteLastCharacter() {
    expression = expression.slice(0, -1);
    showExpression();
}
function applyPercent() {

    if (isValidExpression(expression)) {
        expression = (eval(expression) / 100).toString();
        showExpression();
        showResult(expression);
    }
}
function calculate() {
    if (!isValidExpression(expression)) {
        redScreen();
        return;
    }
    let oldexpression = expression;
    const result = eval(expression);
    expression = result.toString();

    console.log(`Old expression: ${oldexpression}, Result: ${result}`);
    saveToHistory(oldexpression, expression);

    showResult(expression);
    justCalculated = true;
}



// history
function showHistory() {
    historyElement.innerHTML = '';

    history.forEach((item) => {
        const historyItem = document.createElement('div');
        const historyExpression = document.createElement('span');
        const historyResult = document.createElement('span');

        historyItem.classList.add('historyElement');
        historyExpression.classList.add('historyExpression');
        historyResult.classList.add('historyResult');

        historyExpression.textContent = formatForScreen(item.expression);
        historyResult.textContent = ` = ${formatForScreen(item.result)}`;

        historyExpression.dataset.value = item.expression;
        historyResult.dataset.value = item.result;

        historyItem.appendChild(historyExpression);
        historyItem.appendChild(historyResult);
        historyElement.appendChild(historyItem);
    });

}

function saveToHistory(expression, result) {
    history.push({ expression, result });
    // console.log(`History: ${JSON.stringify(history)}`);
    localStorage.setItem('history', JSON.stringify(history));
    showHistory();
}



// listeners
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

operatorScreen.addEventListener('click', (event) => {
    // alert('Operator screen clicked');

    historyElement.classList.toggle('hidden');
});

historyElement.addEventListener('click', (event) => {
    const historyExpression = event.target.closest('.historyExpression');
    const historyResult = event.target.closest('.historyResult');

    justCalculated = false;
    if (historyExpression) {
        expression = historyExpression.dataset.value;
        showExpression();
        showResult("");

        return;
    }
    if (historyResult) {
        expression = historyResult.dataset.value;
        showExpression();
        showResult(expression);
        return;
    }
});
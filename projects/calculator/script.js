
const operatorScreen = document.getElementById('operation');
const resultElement = document.getElementById('result');
const keysElement = document.querySelector('.keys');
const historyElement = document.querySelector('.history');

let history = JSON.parse(localStorage.getItem('history')) || [];
let expression = '';
let justCalculated = false;
showHistory();

const operators = ['+', '-', '*', '/'];



function isNumber(value) {
    return /[0-9]/.test(value);
}
function isOperator(value) {
    return operators.includes(value);
}

function isValidExpression(expression) {
    const hasNumber = isNumber(expression);
    const hasConsecutiveOperators = /[+\-*/]{2,}/.test(expression)
    const hasOperatorAtEnd = isOperator(expression.at(-1))
    const hasconsecutiveDots = /\.{2,}/.test(expression)
    return hasNumber && !hasConsecutiveOperators && !hasOperatorAtEnd && !hasconsecutiveDots;
}


function redScreen() {
    const screen = document.querySelector('.screen');
    screen.classList.add('invalid');

    setTimeout(() => {
        screen.classList.remove('invalid');
    }, 180);

}

function formatForScreen(value) {
    return String(value)
        .replaceAll('*', '×')
        .replaceAll('/', '÷')
        .replaceAll('-', '−');

}

function showExpression() {
    
    operatorScreen.textContent = formatForScreen(expression);
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
    if (justCalculated && isNumber(value)) {
        expression = '';
        showResult(expression);
    }
    justCalculated = false;
    if ((value === '.' && currentNumberHasDecimal()) ||
        (operators.includes(value) && expression === '') ||
        (operators.includes(value) && isOperator(lastCharacter))) {
        redScreen();
        return;
    }
    expression += value;
    showExpression();
}


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
    const oldexpression = expression;
    const result = eval(expression);
    expression = result.toString();

    
    saveToHistory(oldexpression, expression);

    showResult(expression);
    justCalculated = true;
}




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
    
    localStorage.setItem('history', JSON.stringify(history));
    showHistory();
}




keysElement.addEventListener('click', (event) => {
    
    const button = event.target.closest('button');
    const value = button.dataset.value;
    const action = button.dataset.action;
    
    if (value) {
        addValue(value);
        
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
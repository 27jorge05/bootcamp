
const operatorScreen = document.getElementById('operation');
const resultElement = document.getElementById('result');
const keysElement = document.querySelector('.keys');
const historyElement = document.querySelector('.history');
const themeButton = document.getElementById('themeButton');
const savedTheme = localStorage.getItem('theme');
const clearHistoryButton = document.getElementById('clearHistory');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeButton.textContent = '☀️';
}



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

    const fragment = document.createDocumentFragment();

    history.forEach((element) => {
        fragment.appendChild(createHistoryElement(element));

    });

    historyElement.replaceChildren(fragment);

}
function createHistoryElement(item) {


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

    historyItem.append(historyExpression, historyResult);

    return historyItem;


}

function saveToHistory(expression, result) {
    const historyItem = { expression, result };

    history.push(historyItem);

    localStorage.setItem('history', JSON.stringify(history));

    historyElement.appendChild(createHistoryElement(historyItem));
}




keysElement.addEventListener('click', (event) => {

    const button = event.target.closest('button');
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value) {
        addValue(value);

        return;
    }

    switch (action) {
        case 'clear':
            clearCalculator();
            break;
        case 'delete':
            deleteLastCharacter();
            break;
        case 'percent':
            applyPercent();
            break;
        case 'equals':
            calculate();
            break;
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
themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');
    themeButton.textContent = isDark ? '☀️' : '🌙'
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

clearHistoryButton.addEventListener('click', () => {
    history = [];
    localStorage.removeItem('history');
    historyElement.replaceChildren();
});
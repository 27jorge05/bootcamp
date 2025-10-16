const operationElement = document.getElementById('operation');
const resultElement = document.getElementById('result');
const keysElement = document.querySelector('.keys');

let expression = '';

const operators = ['+', '-', '*', '/'];

redScree = () => {
    document.querySelector('.screen').classList.add('red-screen');
    
}

function addValue(value) {
    const lastCharacter = expression.at(-1);
    
    if (value === '.' && currentNumberHasDecimal()) {
        redScreen();
        return;
    }

keysElement.addEventListener('click', (event) => {
    const button =event.target.closest('button');
    const value = button.dataset.value;
    const action = button.dataset.action;
    console.log(`Value: ${value}, Action: ${action}`);
    if(value) {
        addValue(value);
        // console.log(`Value added: ${value}`);
        return;
    }
    if(action === 'clear') {
        clearCalculator();
    }
    if(action === 'delete') {
        deleteLastCharacter();
    }
    if(action === 'percent') {
        applyPercent();
    }
    if(action === 'equals') {
        calculate();
    }
    
});

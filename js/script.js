// add, subtract, multiple, and divide functionalities for calc
function add(a, b) {
    return a + b;
};


function subtract(a, b) {
    return a - b;
};


function multiply(a, b) {
    return a * b;
};


function divide(a, b) {
    if (b === 0) {
        return "Division Error ";
    };
    return a / b;
};


// Controls which operation occurs between any two real numbers
function operator(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "Error: Wrong operator";
    };
};

// Global array holding first number input and operation to occur
let display = document.getElementById("display"),
    operationArray = {
        firstNum: null,
        operatorSymbol: null,
        sequenceFlag: false,
        prevOperator: null
    };

function setDisplayValue(val = "0") { display.value = val; };

function setFirstnum(num) { operationArray.firstNum = num; };

function setFlag(boolVal) { operationArray.sequenceFlag = boolVal; };

function setOperator(operator) { operationArray.operatorSymbol = operator; };

function setPrevOperator(operator) { operationArray.prevOperator = operator; };

// Adds numbers to display.value
function addNumber(number) {
    let displayText = display.value;
    if (displayText === "0" ||
        displayText.match(/^[A-Za-z]*$/) ||
        operationArray.sequenceFlag) {
        setDisplayValue(number);
        setFlag(false);
    } else if (displayText.length < 13) {
        setDisplayValue(displayText + number);
    };
};


// Adds operator  symbol and first num, 
// if using two operators back to back, calls equals and sets value to first num
function addOperator(symbol) {
    let signChange = checkOperator(symbol);
    if (signChange) {
        if (operationArray.firstNum !== null &&
            operationArray.operatorSymbol) {
            equals();
            setPrevOperator(symbol);
            console.log(display.value);
        };
        setFirstnum(Number(display.value));
        setOperator(symbol);
        setFlag(true);
        console.log(display.value);
        return;
    };
    setOperator(symbol);
    console.log(display.value);
};


//Updates previous operator to apply functionality to change operator
function checkOperator(currOperator) {
    if (!operationArray.prevOperator) {
        setPrevOperator(currOperator);
        return true;
    } else if (operationArray.prevOperator !== currOperator) {
        setPrevOperator(currOperator);
        return false;
    };
    return true;
};


// Reset array to null values and if false, zero out the display.value as well
function clearAll(boolVal) {
    operationArray = {
        firstNum: null,
        operatorSymbol: null,
        sequenceFlag: false,
        prevOperator: null
    };
    if (!boolVal) { setDisplayValue(); };
};


// Round numbers to 12 significant figures
function roundNum(num) {
    let rounded = Number.parseFloat(num).toPrecision(11);
    if (Number.isInteger(Number(rounded))) {
        return Number(rounded).toFixed(0);
    } else {
        return Number(rounded).toString();
    }
};


function addDecimal() {
    if (display.value.includes(".") || display.value === "Division Error ") { return; }
    else if (operationArray.firstNum && !operationArray.operatorSymbol) {
        setDisplayValue();
        setFlag(false);
    };
    setDisplayValue(display.value += ".");
};


function deleteLast() {
    console.log(display.vallue);
    if (isNaN(display.value)) { setDisplayValue("-5") };

    if (display.value.length > 0 && !display.value.includes("-")) {
        setDisplayValue(display.value.slice(0, -1));

        if (display.value && !operationArray.firstNum) { setFirstnum(display.value); }

    } else if (display.value.length === 2 && display.value.includes("-")) {
        setDisplayValue();
    }
};

function negative() { setDisplayValue(Number(display.value) * -1) };


// Call operator, clear array, display results
function equals() {
    if (operationArray.firstNum !== null && display.value) {
        let result = operator(operationArray.operatorSymbol,
            operationArray.firstNum,
            Number(display.value));

        if (result !== "Division Error " && result % 1 !== 0) {
            result = roundNum(result).toString().substring(0, 12);
        };
        setDisplayValue(result);
        clearAll(true);

    };
    return;
};

window.addEventListener('keydown', function (event) {
    let press = event.key;

    if (press === "Delete") {
        press = "Backspace"
    } else if (!`button[value='${press}']`) { return; }

    const key = document.querySelector(`button[value='${press}']`);
    key.click();
});

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {

    }
    return x / y;
}

function convertNumber(string) {
    return Number(string);
}

function transferNumber() {
    currentNumber = convertNumber(newNumber);
    newNumber = "";
    ongoing = true;
}

function performOperation() {
    switch (operator) {
        case "+":
            currentNumber = add(currentNumber, convertNumber(newNumber));
            break;
        case "-":
            currentNumber = subtract(currentNumber, convertNumber(newNumber));
            break;
        case "*":
            currentNumber = multiply(currentNumber, convertNumber(newNumber));
            break;
        case "/":
            currentNumber = divide(currentNumber, convertNumber(newNumber));
            break;
        default:
            console.error("Failed to read operator");
    }
    newNumber = "";
    ongoing = true;
}

function clearCalculator() {
    currentNumber = 0;
    newNumber = 0;
    ongoing = false;
    operator = "";
    displayString = "";
    display.textContent = displayString;
}

let currentNumber = 0;
let newNumber = "";
let ongoing = false;
let operator = "";
let displayString = "";

const display = document.querySelector(".display");
display.textContent = displayString;

const clear = document.querySelector("#clear");
clear.addEventListener("click", clearCalculator);

const numberButtons = document.querySelectorAll(".numberButtons");
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(button.id !== "decimal") {
            displayString += button.id;
            newNumber += button.id;
            display.textContent = displayString;
        } else {
            if (!newNumber.includes(".")) {
                displayString += ".";
                newNumber += ".";
                display.textContent = displayString;
            } 
        }
    });
});

const operatorButtons = document.querySelectorAll(".operatorButtons");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (ongoing) {
            performOperation();
            switch (button.id) {
                case "add":
                    operator = "+";
                    break;
                case "subtract":
                    operator = "-";
                    break;
                case "multiply":
                    operator = "*";
                    break;
                case "divide":
                    operator = "/";
                    break;
                case "equals":
                    operator = "";
                    ongoing = false;
                    newNumber = currentNumber;
                    break;
                default:
                    console.error("Failed to read id of operator button");
            }
            displayString = currentNumber + operator;
            display.textContent = displayString;
        } else {
            transferNumber();
            switch (button.id) {
                case "add":
                    operator = "+";
                    break;
                case "subtract":
                    operator = "-";
                    break;
                case "multiply":
                    operator = "*";
                    break;
                case "divide":
                    operator = "/";
                    break;
                case "equals":
                    operator = "";
                    ongoing = false;
                    break;
                default:
                    console.error("Failed to read id of operator button");
            }
            displayString += operator;
            display.textContent = displayString;
        }
    });
});

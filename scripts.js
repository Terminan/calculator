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

function convertNumber() {
    currentNumber = parseInt(newNumber);
    newNumber = "";
    ongoing = true;
}

function performOperation() {
    switch (operator) {
        case "+":
            currentNumber = add(currentNumber, parseInt(newNumber));
            newNumber = "";
            ongoing = true;
            break;
        case "-":
            currentNumber = subtract(currentNumber, parseInt(newNumber));
            newNumber = "";
            ongoing = true;
            break;
        case "*":
            currentNumber = multiply(currentNumber, parseInt(newNumber));
            newNumber = "";
            ongoing = true;
            break;
        case "/":
            currentNumber = divide(currentNumber, parseInt(newNumber));
            newNumber = "";
            ongoing = true;
            break;
        default:
            console.error("Failed to read operator");
    }
}

function clear() {
    currentNumber = 0;
    newNumber = 0;
    ongoing = false;
    operator = "+";
    displayString = "";
}

let currentNumber = 0;
let newNumber = "";
let ongoing = false;
let operator = "+";
let displayString = "";

const display = document.querySelector(".display");
display.textContent = displayString;

const numberButtons = document.querySelectorAll(".numberButtons");
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        displayString += button.id;
        newNumber += button.id;
        display.textContent = displayString;
    });
});

const operatorButtons = document.querySelectorAll(".operatorButtons");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (ongoing) {
            switch (button.id) {
                case "add":
                    performOperation();
                    operator = "+";
                    displayString = currentNumber + operator;
                    break;
                case "subtract":
                    performOperation();
                    operator = "-";
                    displayString = currentNumber + operator;
                    break;
                case "multiply":
                    performOperation();
                    operator = "*";
                    displayString = currentNumber + operator;
                    break;
                case "divide":
                    performOperation();
                    operator = "/";
                    displayString = currentNumber + operator;
                    break;
                case "equals":
                    break;
                default:
                    console.error("Failed to read id of operator button");
            }
            display.textContent = displayString;
        } else {
            switch (button.id) {
                case "add":
                    convertNumber();
                    operator = "+";
                    displayString += operator;
                    break;
                case "subtract":
                    convertNumber();
                    operator = "-";
                    displayString += operator;
                    break;
                case "multiply":
                    convertNumber();
                    operator = "*";
                    displayString += operator;
                    break;
                case "divide":
                    convertNumber();
                    operator = "/";
                    displayString += operator;
                    break;
                default:
                    console.error("Failed to read id of operator button");
            }
            display.textContent = displayString;
        }
    });
});

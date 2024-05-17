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
        return "*/0";
    }
    return x / y;
}

function convertNumber(string) {
    return Number(string);
}

function transferNumber() {
    if (newNumber !== "") {
        currentNumber = convertNumber(newNumber);
        newNumber = "";
    }
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
    if (currentNumber.toString().includes(".")) {
        currentNumber = Number(currentNumber.toFixed(5));
    }
    newNumber = "";
    ongoing = true;
}

function clearCalculator() {
    currentNumber = 0;
    newNumber = "";
    ongoing = false;
    operator = "";
    displayString = "";
    display.textContent = displayString;
}

const NUMBERS = "0123456789";

function erase() {
    if (!(displayString === "")) {
        if (NUMBERS.includes(displayString.slice(-1))) {
            if (newNumber === "") {
                currentNumber = convertNumber(currentNumber.toString().substring(0, currentNumber.toString().length - 1));
            } else {
                newNumber = newNumber.substring(0, newNumber.length - 1);
            }
        } else {
            operator = "";
            ongoing = false;
        }
        displayString = displayString.substring(0, displayString.length - 1);
    }
    console.log(`currentNumber: ${currentNumber}, newNumber: ${newNumber}`);
    display.textContent = displayString;
}

let currentNumber = 0;
let newNumber = "";
let ongoing = false;
let operator = "";
let displayString = "";

const mainContainer = document.querySelector(".mainContainer");

const calculator = document.querySelector(".calculator");

const display = document.querySelector(".display");
display.textContent = displayString;

const clear = document.querySelector("#clear");
clear.addEventListener("click", clearCalculator);

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", erase);

const contingency = document.createElement("div");
contingency.setAttribute("height", "50vh");
contingency.setAttribute("flex-direction", "column");
const contingencyImage = document.createElement("img");
contingencyImage.src = "img/explosion.svg";
const contingencyText = document.createElement("h1");
contingencyText.textContent = "You did a bad thing.";
const contingencyButton = document.createElement("button");
contingencyButton.classList.add("contingencyButton");
contingencyButton.textContent = "Click to Reset";
contingencyButton.addEventListener("click", () => {
    mainContainer.removeChild(contingency);
    mainContainer.appendChild(calculator);
});
contingency.appendChild(contingencyImage);
contingency.appendChild(contingencyText);
contingency.appendChild(contingencyButton);

function enterNumber(pressedButton) {
    newNumber += pressedButton;
    if (ongoing) {
        displayString += pressedButton;
    } else {
        displayString = newNumber;
    }
    display.textContent = displayString;
}

const numberButtons = document.querySelectorAll(".numberButtons");
numberButtons.forEach(button => {
    button.addEventListener("click", () => enterNumber(button.id));
});

function enterDecimal() {
    if (!newNumber.includes(".")) {
        displayString += ".";
        newNumber += ".";
        display.textContent = displayString;
    }
}

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", enterDecimal);

function enterOperator(pressedButton) {
    if (ongoing) {
        performOperation();
    } else {
        transferNumber();
    }
    switch (pressedButton) {
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
            newNumber = "";
            ongoing = false;
            console.log(`currentNumber: ${currentNumber}, newNumber: ${newNumber}`);
            break;
        default:
            console.error("Failed to read id of operator button");
    }
    if (currentNumber !== "*/0") {
        displayString = currentNumber + operator;
        display.textContent = displayString;
    } else {
        clearCalculator();
        mainContainer.removeChild(calculator);
        mainContainer.appendChild(contingency);
    }
}

const operatorButtons = document.querySelectorAll(".operatorButtons");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => enterOperator(button.id));
});

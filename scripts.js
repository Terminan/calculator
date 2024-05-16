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

function erase() {

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

const numberButtons = document.querySelectorAll(".numberButtons");
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        newNumber += button.id;
        if(ongoing) {
            displayString += button.id;
        } else {
            displayString = newNumber;
        }
        display.textContent = displayString;
    });
});

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", () => {
    if (!newNumber.includes(".")) {
        displayString += ".";
        newNumber += ".";
        display.textContent = displayString;
    }
});

const operatorButtons = document.querySelectorAll(".operatorButtons");
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (ongoing) {
            performOperation();
        } else {
            transferNumber();
        }
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
                newNumber = "";
                ongoing = false;
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
    });
});

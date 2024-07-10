// Select all the button and the screen from the html file
var buttons = document.querySelectorAll(".input");
var display = document.querySelector(".screen");
var currentInput = "";
// add click event listener to each buttons
buttons.forEach(function (button) {
    button.addEventListener('click', function () { return handleButtonClick(button.value); });
});
// Function for clear screen
var clearScreen = function () {
    currentInput = "";
    display.value = currentInput;
};
// Function to calculate element in screen
var evaluteExpression = function () {
    try {
        var result = eval(currentInput);
        display.value = result;
        currentInput = result.toString();
    }
    catch (error) {
        display.value = "Error";
        currentInput = "";
    }
};
// Append Value to the screen
var appendToScreen = function (value) {
    currentInput += value;
    display.value = currentInput;
};
// Handle how button should be clicked.
var handleButtonClick = function (value) {
    if (value === "AC") {
        clearScreen();
    }
    else if (value === "=") {
        evaluteExpression();
    }
    else {
        appendToScreen(value); 
    }
};

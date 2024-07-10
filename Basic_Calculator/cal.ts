// Select all the button and the screen from the html file
const buttons = document.querySelectorAll(".input") as NodeListOf<HTMLButtonElement>;
const display = document.querySelector(".screen") as HTMLInputElement;

let currentInput: string = "";

// add click event listener to each buttons
buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.value));
})

// Function for clear screen
const clearScreen = (): void => {
    currentInput = "";
    display.value = currentInput
}
// Function to calculate element in screen
const evaluteExpression = (): void => {
    try {
        const result = eval(currentInput);
        display.value = result;
         currentInput = result.toString();
    }
    catch (error) {
        display.value = "Error";
        currentInput = "";
    }
}

// Append Value to the screen
const appendToScreen = (value: string): void => {
    currentInput += value;
    display.value = currentInput;
}
    

// Handle how button should be clicked.
const handleButtonClick = (value: string): void => {
    if (value === "AC") {
        clearScreen();
    }
    else if (value === "=") {
        evaluteExpression();
    }
    else {
        appendToScreen(value)
    }
}




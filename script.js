const display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousInput = null;

// Function to update display
function updateDisplay() {
  display.textContent = currentInput;
}

// Add click event listeners to all buttons
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.getAttribute('data-action');
    const value = button.getAttribute('data-value');

    if (!action) {
      // Number button
      if (currentInput === '0') {
        currentInput = value;
      } else {
        currentInput += value;
      }
    } else if (action === 'clear') {
      // Clear button
      currentInput = '0';
      operator = null;
      previousInput = null;
    } else if (action === 'delete') {
      // Delete button
      currentInput = currentInput.slice(0, -1) || '0';
    } else if (action === 'operator') {
      // Operator button
      if (operator && previousInput !== null) {
        calculate();
      }
      operator = value;
      previousInput = currentInput;
      currentInput = '0';
    } else if (action === 'calculate') {
      // Equals button
      if (operator) {
        calculate();
        operator = null;
      }
    }

    updateDisplay();
  });
});

// Calculation function
function calculate() {
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(curr)) return;

  let result = 0;
  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      result = prev / curr;
      break;
  }

  currentInput = result.toString();
  previousInput = null;
}

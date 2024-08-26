document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.btn');
  let currentInput = '';
  let operator = '';
  let firstOperand = null;
  let isOperatorClicked = false;

  buttons.forEach(button => {
      button.addEventListener('click', () => {
          const action = button.getAttribute('data-action');
          const value = button.textContent;

          if (action === 'number') {
              if (isOperatorClicked) {
                  currentInput = '';
                  isOperatorClicked = false;
              }
              currentInput += value;
              display.value += value;
          }

          if (action === 'operator') {
              if (currentInput === '' && firstOperand === null) return;
              if (value === '√') {
                  currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                  display.value = currentInput;
                  return;
              }
              if (value === '%') {
                  currentInput = (parseFloat(currentInput) / 100).toString();
                  display.value = currentInput;
                  return;
              }
              if (firstOperand !== null && !isOperatorClicked) {
                  currentInput = calculate(firstOperand, operator, currentInput);
                  display.value = currentInput;
              }
              operator = button.getAttribute('data-operator');
              firstOperand = currentInput;
              isOperatorClicked = true;
              display.value += ` ${operator} `;
          }

          if (action === 'calculate') {
              try {
                  // Evaluate the entire expression in the display
                  display.value = eval(display.value);
              } catch (e) {
                  display.value = "Error";
              }
              firstOperand = null;
              currentInput = display.value;
              isOperatorClicked = false;
          }

          if (action === 'clear') {
              firstOperand = null;
              currentInput = '';
              operator = '';
              display.value = '';
              isOperatorClicked = false;
          }

          if (action === 'delete') {
              currentInput = currentInput.slice(0, -1);
              display.value = display.value.slice(0, -1);
          }
      });
  });

  function calculate(first, operator, second) {
      const firstNumber = parseFloat(first);
      const secondNumber = parseFloat(second);
      if (isNaN(firstNumber) || isNaN(secondNumber)) return '';

      if (operator === '+') return (firstNumber + secondNumber).toString();
      if (operator === '-') return (firstNumber - secondNumber).toString();
      if (operator === '*') return (firstNumber * secondNumber).toString();
      if (operator === '/') return (firstNumber / secondNumber).toString();
  }
});

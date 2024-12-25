// Structure of the data
// 1. Create a class called Calculator
// 2. Add methods to the class for add, subtract, multiply, divide, and negate
// 3. Each method should take two arguments and return the result of the operation
// 4. The add, subtract, multiply, and divide methods should perform the corresponding operation
// 5. The negate method should return the negative of the first argument
// 6. create a function to collect the operands and the operator in a list
// 7. create a function to calculate the result of the operation
// 8. create a function to display the result of the operation
// 9. create a function to clear the display
// 10. create a function to delete the last character in the display

// Example
// [1, '+', 2] => 3
// [1, '+', 2, '*', 3] => 7
// [1, '+', 2, '*', 3, '/', 4] => 1.75
// [1, '+', 2, '*', 3, '/', 4, '-', 5] => -3.25
// Prioritize the order of operations

// Extra Conditions
// [1, "+"] => 1
// [1, "+", "+"] => 1

// Order of Operations
// 1. Multiplication and Division
// 2. Addition and Subtraction

// Example (step by step)
// 1. [1, '+', 2 '*', 3] => 3
// 2. get the result of the first operation by locating the operator
// 3. get the index of the operator
// 4. get the operands and the operator (also delete from array)
// 6. calculate the result of the operation and update in the array
// 7. repeat the process until the array is empty
// 8. return the result

// [1, '+', 6] => 7

class Calculator {
  constructor() {
    this.collection = ["0"];
    this.result = 0;
  }

  // Return the collection
  getCollection() {
    return this.collection;
  }

  // Set the collection
  setCollection(collection) {
    this.collection = collection;
  }

  // Return the result
  getResult() {
    return this.result;
  }

  // Set the result
  setResult(result) {
    this.result = result;
  }

  // Clear the collection
  clear() {
    this.setCollection(["0"]);
  }

  // Delete the last collection
  deleteLastCollection() {
    if (this.collection.length === 1) {
      this.setCollection(["0"]);
    } else {
      this.collection.pop();
    }
  }

  // Check whether the item is an operand
  isOperand(item) {
    if (item === ".") {
      return true;
    } else {
      try {
        parseFloat(item);
        return true;
      } catch (error) {
        return false;
      }
    }
  }

  // Check whether the item is an operator
  isOperator(item) {
    return item === "+" || item === "-" || item === "x" || item === "/" || item === "+/-";
  }

  // Add the operand and the operator to the collection
  addCollection(item) {
    // check whether the collection is non empty
    if (this.collection.length !== 0) {
      // handle the case for first item
      if (this.collection.length === 1 && this.collection[0] === "0") {
        this.collection[0] = item;
        return;
      }
      // check whether the last item is an operand
      // if so, concatenate the last item with the current item
      if (this.isOperand(this.collection[this.collection.length - 1]) && !this.isOperator(item) && !this.isOperator(this.collection[this.collection.length - 1])) {
        // should handle if user input dot multiple time, only allow one dot
        // handle repeated dots
        if (item === ".") {
          if (this.collection[this.collection.length - 1].includes(".")) {
            return;
          }
          this.collection[this.collection.length - 1] += item;
        } else {
          this.collection[this.collection.length - 1] += item;
        }
      } else if (item === "+/-") {
        // check whether the last item is an negate operator
        // if so, negate the last item
        this.collection[this.collection.length - 1] = String(this.collection[this.collection.length - 1] * -1);
      } else {
        // check whether the last item is an operator
        if (item === ".") {
          if (this.collection[this.collection.length - 1].includes(".")) {
            return;
          }
        } else {
          // if so, change the last operator to current item
          if (this.isOperator(this.collection[this.collection.length - 1]) && this.isOperator(item)) {
            this.collection.pop();
            this.collection.push(item);
          } else {
            // add the item to the collection
            this.collection.push(item);
          }
        }
      }
    } else {
      // check whether the item is a dot
      // if so, add 0 before the dot
      if (item === ".") {
        this.collection.push("0" + item);
      } else {
        // add the item to the collection
        // this.collection.push(item);
        this.setCollection([item]);
      }
    }
  }

  // Check the operator and return a method to perform an operation
  // A method will act as callback function
  switchOperator(operator) {
    switch (operator) {
      case "x":
        return this.multiply;
      case "/":
        return this.divide;
      case "+":
        return this.add;
      case "-":
        return this.subtract;
      case "+/-":
        return this.negate;
    }
  }

  add(a, b) {
    return a + b;
  }
  subtract(a, b) {
    return a - b;
  }
  multiply(a, b) {
    return a * b;
  }
  divide(a, b) {
    return a / b;
  }
  negate(a) {
    return -a;
  }

  // Get the index of the operator
  // Also handle the order of the operation
  getOperatorIndex() {
    return this.collection.findIndex((item) => item === "x" || item === "/" || item === "+" || item === "-");
  }

  // Calculate the result of the operation
  calculate() {
    // check the last items of the collection is an operator
    // if so, remove the last item
    if (this.isOperator(this.collection[this.collection.length - 1])) {
      this.collection.pop();
    }

    // get the index of the operator
    // prioritize the order of operations
    // select the operand between the operator and calculate the result with callback function
    // update the collection with the result
    // repeat the process until the collection is empty
    // return the result if the collection is empty
    while (this.collection.length > 1) {
      const operatorIndex = this.getOperatorIndex(this.collection); // get the index of the operator
      const operator = this.collection[operatorIndex]; // get the operator
      const operands = this.collection.splice(operatorIndex - 1, 3); // remove the operator and the operands
      const result = this.switchOperator(operator)(parseFloat(operands[0]), parseFloat(operands[2])); // calculate the result

      // replace the operator and the operands with the result in the same index
      // Example
      // [1, '+', 2, '*', 3, '-', '1'] => [1, '+', 6, '-', '1'] => [7, '-', '1'] => [5]
      this.collection.splice(operatorIndex - 1, 0, result);
    }

    this.setResult(this.collection[0]);
    this.setCollection([]);
  }
}

function render() {
  // Initiate new class
  const calculator = new Calculator();
  console.log(calculator);

  // Select the number buttons
  const zero = document.getElementById(["0"]);
  const one = document.getElementById(["1"]);
  const two = document.getElementById(["2"]);
  const three = document.getElementById(["3"]);
  const four = document.getElementById(["4"]);
  const five = document.getElementById(["5"]);
  const six = document.getElementById(["6"]);
  const seven = document.getElementById(["7"]);
  const eight = document.getElementById(["8"]);
  const nine = document.getElementById(["9"]);

  // Select the operator buttons
  const deleteAll = document.getElementById(["CE"]);
  const deleteLast = document.getElementById(["C"]);
  const divide = document.getElementById(["/"]);
  const multiply = document.getElementById(["x"]);
  const subtract = document.getElementById(["-"]);
  const add = document.getElementById(["+"]);
  const negate = document.getElementById(["+/-"]);
  const comma = document.getElementById(["."]);

  // Create an array of operators and operands
  const operator = [divide, multiply, subtract, add, negate, comma];
  const operand = [zero, one, two, three, four, five, six, seven, eight, nine];

  // Select the result button
  const calc = document.getElementById(["="]);

  // Select the display input
  const displayInput = document.getElementById("display-input");

  // Select the display result
  const displayResult = document.getElementById("display-result");

  // Add event listeners to result button
  // Get the result of the operation and display it
  calc.addEventListener("click", () => {
    calculator.calculate();
    displayInput.textContent = 0;
    displayResult.textContent = calculator.getResult();
    console.log(calculator.getResult());
  });

  // Add event listeners to deleteALl button
  // Clear the display and the collection
  deleteAll.addEventListener("click", () => {
    calculator.clear();
    displayInput.textContent = 0;
    displayResult.textContent = 0;
    console.log(calculator.getCollection());
  });

  // Add event listeners to deleteLast button
  // Delete the last character in the display and the collection
  deleteLast.addEventListener("click", () => {
    calculator.deleteLastCollection();
    displayInput.textContent = calculator.getCollection().join(" ");
    console.log(calculator.getCollection());
  });

  // Add event listeners to every operand
  // Add the operand to the collection and update the display
  operand.forEach((item) => {
    item.addEventListener("click", () => {
      calculator.addCollection(item.dataset.operand);
      console.log(item.dataset.operand);
      displayInput.textContent = calculator.getCollection().join(" ");
      console.log(calculator.getCollection());
    });
  });

  // Add event listeners to every operator
  // Add the operator to the collection and update the display
  operator.forEach((item) => {
    item.addEventListener("click", () => {
      calculator.addCollection(item.dataset.operator);
      console.log(item.dataset.operator);
      displayInput.textContent = calculator.getCollection().join(" ");
      console.log(calculator.getCollection());
    });
  });
}

// Add event listener to the window
window.addEventListener("DOMContentLoaded", render);

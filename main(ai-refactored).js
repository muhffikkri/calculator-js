/**
 * Calculator class to perform basic arithmetic operations.
 */
class Calculator {
  /**
   * Creates an instance of Calculator.
   */
  constructor() {
    /**
     * Collection of input values.
     * @type {string[]}
     */
    this.collection = ["0"];

    /**
     * Result of the calculation.
     * @type {number}
     */
    this.result = 0;
  }

  /**
   * Gets the current collection of input values.
   * @returns {string[]} The current collection.
   */
  getCollection() {
    return this.collection;
  }

  /**
   * Sets the collection of input values.
   * @param {string[]} collection - The new collection.
   */
  setCollection(collection) {
    this.collection = collection;
  }

  /**
   * Gets the current result of the calculation.
   * @returns {number} The current result.
   */
  getResult() {
    return this.result;
  }

  /**
   * Sets the result of the calculation.
   * @param {number} result - The new result.
   */
  setResult(result) {
    this.result = result;
  }

  /**
   * Clears the collection, resetting it to ["0"].
   */
  clear() {
    this.setCollection(["0"]);
  }

  /**
   * Deletes the last item in the collection.
   * If the collection has only one item, it resets to ["0"].
   */
  deleteLastCollection() {
    if (this.collection.length === 1) {
      this.setCollection(["0"]);
    } else {
      this.collection.pop();
    }
  }

  /**
   * Checks if the given item is an operand (number or decimal point).
   * @param {string} item - The item to check.
   * @returns {boolean} True if the item is an operand, false otherwise.
   */
  isOperand(item) {
    return !isNaN(item) || item === ".";
  }

  /**
   * Checks if the given item is an operator.
   * @param {string} item - The item to check.
   * @returns {boolean} True if the item is an operator, false otherwise.
   */
  isOperator(item) {
    return ["+", "-", "x", "/", "+/-"].includes(item);
  }

  /**
   * Adds an item to the collection.
   * Handles cases for operands, operators, and the +/- operator.
   * @param {string} item - The item to add.
   */
  addCollection(item) {
    if (this.collection.length === 1 && this.collection[0] === "0") {
      if (this.isOperator(item) || item === ".") {
        this.collection[0] += item;
        return;
      } else {
        this.collection[0] = item;
        return;
      }
    }

    const lastItem = this.collection[this.collection.length - 1];

    if (this.isOperand(lastItem) && !this.isOperator(item)) {
      if (item === "." && lastItem.includes(".")) return;
      this.collection[this.collection.length - 1] += item;
    } else if (item === "+/-") {
      this.collection[this.collection.length - 1] = String(-parseFloat(lastItem));
    } else {
      if (this.isOperator(lastItem) && this.isOperator(item)) {
        this.collection.pop();
      }
      this.collection.push(item);
    }
  }

  /**
   * Returns the function corresponding to the given operator.
   * @param {string} operator - The operator.
   * @returns {Function} The function to perform the operation.
   */
  switchOperator(operator) {
    const operations = {
      x: (a, b) => a * b,
      "/": (a, b) => a / b,
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "+/-": (a) => -a,
    };
    return operations[operator];
  }

  /**
   * Gets the index of the first operator in the collection.
   * @returns {number} The index of the first operator.
   */
  getOperatorIndex() {
    return this.collection.findIndex((item) => ["x", "/", "+", "-"].includes(item));
  }

  /**
   * Performs the calculation based on the current collection.
   * Handles operator precedence and updates the result.
   */
  calculate() {
    if (this.isOperator(this.collection[this.collection.length - 1])) {
      this.collection.pop();
    }

    while (this.collection.length > 1) {
      const operatorIndex = this.getOperatorIndex();
      const operator = this.collection[operatorIndex];
      const operands = this.collection.splice(operatorIndex - 1, 3);
      const result = this.switchOperator(operator)(parseFloat(operands[0]), parseFloat(operands[2]));
      this.collection.splice(operatorIndex - 1, 0, result);
    }

    this.setResult(this.collection[0]);
    this.setCollection([]);
  }
}

function render() {
  const calculator = new Calculator();

  const buttons = {
    zero: document.getElementById("0"),
    one: document.getElementById("1"),
    two: document.getElementById("2"),
    three: document.getElementById("3"),
    four: document.getElementById("4"),
    five: document.getElementById("5"),
    six: document.getElementById("6"),
    seven: document.getElementById("7"),
    eight: document.getElementById("8"),
    nine: document.getElementById("9"),
    deleteAll: document.getElementById("CE"),
    deleteLast: document.getElementById("C"),
    divide: document.getElementById("/"),
    multiply: document.getElementById("x"),
    subtract: document.getElementById("-"),
    add: document.getElementById("+"),
    negate: document.getElementById("+/-"),
    comma: document.getElementById("."),
    calc: document.getElementById("="),
  };

  const displayInput = document.getElementById("display-input");
  const displayResult = document.getElementById("display-result");

  buttons.calc.addEventListener("click", () => {
    calculator.calculate();
    displayInput.textContent = 0;
    displayResult.textContent = calculator.getResult();
  });

  buttons.deleteAll.addEventListener("click", () => {
    calculator.clear();
    displayInput.textContent = 0;
    displayResult.textContent = 0;
  });

  buttons.deleteLast.addEventListener("click", () => {
    calculator.deleteLastCollection();
    displayInput.textContent = calculator.getCollection().join(" ");
  });

  const operands = [buttons.zero, buttons.one, buttons.two, buttons.three, buttons.four, buttons.five, buttons.six, buttons.seven, buttons.eight, buttons.nine];
  operands.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.addCollection(button.dataset.operand);
      displayInput.textContent = calculator.getCollection().join(" ");
    });
  });

  const operators = [buttons.divide, buttons.multiply, buttons.subtract, buttons.add, buttons.negate, buttons.comma];
  operators.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.addCollection(button.dataset.operator);
      displayInput.textContent = calculator.getCollection().join(" ");
    });
  });
}

window.addEventListener("DOMContentLoaded", render);

# Calculator Application

## Description

This project involves building a basic calculator using JavaScript and then refactoring the code with the help of GitHub Copilot. The initial implementation is in `main.js`, and the refactored version is in `main(ai-refactored).js`.

<!-- ## Author

[Your Name]

## Date

[Today's Date]

## Version

1.0 -->

## Dependencies

- `Calculator.js`

## Notes

This is the main entry point for the application. It creates an instance of the Calculator class and uses it to perform some basic calculations.

## TODO

- Add more functionality to the Calculator class.
- Add more functionality to the application.

## Initial Implementation (`main.js`)

### Steps to Build the Calculator

1. **Create a Calculator Class**:

   - Define a `Calculator` class with methods for basic arithmetic operations: add, subtract, multiply, divide, and negate.
   - Each method takes two arguments and returns the result of the operation.

2. **Collect Operands and Operators**:

   - Create a function to collect operands and operators in a list.

3. **Calculate the Result**:

   - Create a function to calculate the result of the operation, prioritizing the order of operations (multiplication and division first, then addition and subtraction).

4. **Display the Result**:

   - Create a function to display the result of the operation.

5. **Clear the Display**:

   - Create a function to clear the display.

6. **Delete the Last Character**:
   - Create a function to delete the last character in the display.

### Example Calculations

- `[1, '+', 2]` => `3`
- `[1, '+', 2, '*', 3]` => `7`
- `[1, '+', 2, '*', 3, '/', 4]` => `1.75`
- `[1, '+', 2, '*', 3, '/', 4, '-', 5]` => `-3.25`

### Code Structure

The initial implementation includes a `Calculator` class with methods to handle the collection of inputs, perform calculations, and update the display. Event listeners are added to buttons to handle user interactions.

## Refactoring with GitHub Copilot (`main(ai-refactored).js`)

### Improvements Made by Copilot

1. **Code Organization**:

   - The refactored code is more organized, with clear documentation for each method and function.

2. **Enhanced Methods**:

   - The methods for checking operands and operators are more concise and efficient.
   - The `addCollection` method handles edge cases better, such as repeated dots and negation.

3. **Operator Handling**:

   - The `switchOperator` method uses an object to map operators to their corresponding functions, making it more readable and maintainable.

4. **Calculation Logic**:
   - The `calculate` method handles operator precedence more effectively and updates the result accordingly.

### Using the Calculator

1. **Initialize the Calculator**:

   - The `Calculator` class is instantiated, and event listeners are added to buttons for user interactions.

2. **Perform Calculations**:

   - Click on number buttons to input operands.
   - Click on operator buttons to input operators.
   - Click on the `=` button to calculate the result.
   - The result is displayed on the screen.

3. **Clear and Delete**:
   - Click on the `CE` button to clear the entire input.
   - Click on the `C` button to delete the last character.

### Logic Step-by-Step

1. **Input Collection**:

   - The `addCollection` method collects operands and operators, handling edge cases like repeated dots and negation.

2. **Operator Precedence**:

   - The `calculate` method prioritizes multiplication and division over addition and subtraction.

3. **Result Calculation**:
   - The `switchOperator` method maps operators to their corresponding functions.
   - The `calculate` method performs the operations step-by-step, updating the collection with intermediate results until only the final result remains.

## Conclusion

By leveraging GitHub Copilot, the refactored code in `main(ai-refactored).js` is more efficient, readable, and maintainable. The improvements made by Copilot enhance the overall functionality and user experience of the calculator.

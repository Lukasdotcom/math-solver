export const operations = [
  ["^"],
  ["*", "/"],
  ["+", "-"],
];
const operationsRegex = /\!|\^|\*|\/|\-|\+/;
/**
 * Does addition, subtraction, multiplication, division, parenthesis, factorial, and exponents. All in the order of operations
 * @param {string} text - The text you want the answer for ex: "1+1*(3^2+1)" is 11.
 * @returns {number} The result of the equation.
 */
export const simpleMath = (text: string): number => {
  while (true) {
    // Finds the first parenthesis to check what the value of it is.
    const first = text.search("\\(");
    if (first > 0) {
      // If a parenthesis exists the content is recursivly sent through this function to find the answer to it
      const close = matchingParenthesis(text, first);
      const result = simpleMath(text.substring(first + 1, close));
      text = text.replace(text.substring(first, close + 1), String(result));
    } else {
      break;
    }
  }
  // Goes through every operation
  operations.forEach((operationChoice) => {
    while (true) {
      let operation;
      let first = -1;
      // Finds the first instance of the operations in that tier while making sure it is not a negative symbol
      operationChoice.forEach((maybeOperation) => {
        let starting = 1;
        while (true) {
          let potentialFirst =
            text.substring(starting).search(`\\${maybeOperation}`) + starting;
          // Checks if the operation exists past that point and makes sure it is not a negative symbol
          if (potentialFirst >= starting) {
            if (
              parseInt(text.substring(potentialFirst - 1, potentialFirst)) > -1
            ) {
              if (potentialFirst < first || first === -1) {
                first = potentialFirst;
                operation = maybeOperation;
              }
              return;
            }
          } else {
            return;
          }
          starting += 1;
        }
      });
      if (first > -1 && operation) {
        // Finds the start of the first number
        let start = first-1;
        // Goes through the number
        while (true) {
          if (start < 1) start = 0;
          if (start === 0) break;
          if (text.substring(start - 1, start).search(/[0-9]|\./) == -1) {
            break;
          }
          start -= 1;
        }
        // Waits until the next number is found and just before that happens it stops
        while (true) {
          if (start < 2) start = 0;
          if (start === 0) break;
          if (text.substring(start - 2, start-1).search(/[0-9]|\./) > -1) {
            break;
          }
          start -= 1;
        }
        // Finds the end of the second number
        let end = 0;
        let counter = first + 1;
        while (true) {
          if (counter >= text.length) {
            end = text.length;
            return;
          }
          end = text.substring(counter).search(operationsRegex) + counter;
          // Checks if there actually is another operator
          if (end < counter) {
            end = text.length;
            break;
          }
          // Checks if this is a negative symbol
          if (end === counter) {
            counter += 1;
          } else {
            break;
          }
        }
        // Gets the 2 numbers
        const number1 = _parseFloat(text.substring(start, first));
        const number2 = _parseFloat(text.substring(first + 1, end));
        let result = 0;
        switch (operation) {
          case "^":
            result = Math.pow(number1, number2);
            break;
          case "*":
            result = number1 * number2;
            break;
          case "/":
            result = number1 / number2;
            break;
          case "-":
            result = number1 - number2;
            break;
          default:
            result = number1 + number2;
            break;
        }
        if (isNaN(result)) {
          throw "Calculation failed";
        }
        text = text.replace(text.substring(start, end), String(result));
      } else {
        break;
      }
    }
  });
  return _parseFloat(text);
};
/**
 * Used to find the matching closing parenthesis to the opening parenthesis at the index given
 * @param {string} text - The equation you are using.
 * @param {number} idx - The index of the opening parenthesis.
 * @returns {number} The index of the closing parenthesis.
 */
const matchingParenthesis = (text: string, idx: number): number => {
  idx += 1;
  let depth = 0;
  while (idx >= 0 && idx < text.length) {
    if (text.substring(idx, idx+1) === ")") {
      if (depth > 0) {
        depth -= 1;
      } else {
        return idx;
      }
    }
    if (text.substring(idx) === "(") {
      depth += 1;
    }
    idx += 1;
  }
  throw "Could not find closing parenthesis";
};
/**
 * Is like the actual parseFloat(turning string to number) but allows for unlimited \- signs before the number.
 * @param {string} num - The float as a string.
 * @returns {number} The resulting number.
 */
const _parseFloat = (num: string): number => {
  const firstNumber = num.search(/[0-9]/);
  if (firstNumber < 1) {
    return parseFloat(num);
  } else {
    return (
      parseFloat(num.substring(firstNumber)) * (firstNumber % 2 == 0 ? 1 : -1)
    );
  }
};

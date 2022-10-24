import { _parseFloat, factorial, log } from ".";
const operations = [["^"], ["*", "/"], ["+", "-"]];
const operationsRegex = /\!|\^|\*|\/|\-|\+/;
const functions = ["sin", "cos", "tan", "log", "ln"];
interface Dictionary<T> {
  [Key: string]: T;
}
const functionToCall: Dictionary<(equation: string) => simpleSolution> = {
  sin: (equation: string): simpleSolution => {
    const answer = simpleMath(equation);
    // Checks if the automatic switching to degrees should happen
    const actualAnswer =
      Math.abs(answer.answer) < 7
        ? answer.answer
        : (answer.answer / 180) * Math.PI;
    const result = Math.sin(actualAnswer);
    return {
      answer: result,
      steps: [...answer.steps, String(result)],
    };
  },
  cos: (equation: string): simpleSolution => {
    const answer = simpleMath(equation);
    // Checks if the automatic switching to degrees should happen
    const actualAnswer =
      Math.abs(answer.answer) < 7
        ? answer.answer
        : (answer.answer / 180) * Math.PI;
    const result = Math.cos(actualAnswer);
    return {
      answer: result,
      steps: [...answer.steps, String(result)],
    };
  },
  tan: (equation: string): simpleSolution => {
    const answer = simpleMath(equation);
    // Checks if the automatic switching to degrees should happen
    const actualAnswer =
      Math.abs(answer.answer) < 7
        ? answer.answer
        : (answer.answer / 180) * Math.PI;
    const result = Math.tan(actualAnswer);
    return {
      answer: result,
      steps: [...answer.steps, String(result)],
    };
  },
  log: (equation: string): simpleSolution => {
    const answer = simpleMath(equation);
    const result = log(answer.answer, 10);
    return {
      answer: result,
      steps: [...answer.steps, String(result)],
    };
  },
  ln: (equation: string): simpleSolution => {
    const answer = simpleMath(equation);
    const result = log(answer.answer, Math.E);
    return {
      answer: result,
      steps: [...answer.steps, String(result)],
    };
  },
};
interface simpleSolution {
  answer: number;
  steps: string[];
}
/**
 * Does addition, subtraction, multiplication, division, parenthesis, factorial, and exponents. All in the order of operations. It also supports trig functions and logs.
 * @param {string} text - The text you want the answer for ex: "1+1*(3^2+1)" is 11.
 * @returns {simpleSolution} The result of the equation. Steps is an array of steps and answer is the solution to the equation
 */
export const simpleMath = (text: string): simpleSolution => {
  let steps: string[] = [text];
  // Replaces every constant with their number value
  text = text.replace(/\π/g, String(Math.PI));
  text = text.replace(/e/g, String(Math.E));
  while (true) {
    // Finds the first parenthesis to check what the value of it is.
    const first = text.search("\\(");
    if (first > 0) {
      // Finds if there is any special function
      let func = "";
      let idx = first - 1;
      while (true) {
        const char = text.substring(idx, idx + 1);
        if (char.search(/[a-zA-Z]/) > -1) {
          func = char + func;
        } else {
          break;
        }
        idx -= 1;
      }
      // If a parenthesis exists the content is recursivly sent through this function to find the answer to it
      const close = matchingParenthesis(text, first);
      let result: simpleSolution = { steps: [], answer: 2 };
      // Checks if there was a function for this
      if (func === "") {
        result = simpleMath(text.substring(first + 1, close));
      } else {
        if (functionToCall[func]) {
          result = functionToCall[func](text.substring(first + 1, close));
        } else {
          throw `Could not find function ${func}`;
        }
      }
      const newSteps = result.steps
        .slice(1)
        .map((e) => text.replace(text.substring(first + 1, close), String(e)));
      if (newSteps.length > 0) {
        steps = [...steps, ...newSteps];
      }
      text = text.replace(
        func + text.substring(first, close + 1),
        String(result.answer)
      );
      steps.push(text);
    } else {
      break;
    }
  }
  // Replaces every constant with their number value
  text = text.replace(/\π/g, String(Math.PI));
  text = text.replace(/e/g, String(Math.E));
  // Finds factorials
  while (true) {
    const location = text.search("!");
    if (location === -1) {
      break;
    }
    // Finds the start of the number
    let numberStart = location;
    while (true) {
      if (numberStart === 0) break;
      if (!(parseInt(text.substring(numberStart - 1, numberStart)) > -1)) {
        break;
      }
      numberStart -= 1;
    }
    if (numberStart < location) {
      // Gets the answer
      const result = factorial(
        _parseFloat(text.substring(numberStart, location))
      );
      text = text.replace(
        text.substring(numberStart, location + 1),
        String(result)
      );
      steps.push(text);
    } else {
      throw "Could not find number for factorial";
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
        let start = first - 1;
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
          if (text.substring(start - 2, start - 1).search(/[0-9]|\./) > -1) {
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
        steps.push(text);
      } else {
        break;
      }
    }
  });
  return {
    answer: _parseFloat(text),
    steps,
  };
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
    if (text.substring(idx, idx + 1) === ")") {
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

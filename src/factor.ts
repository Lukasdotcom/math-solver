/**
 * DO NOT USE THIS RIGHT NOW
 * @todo This needs to actually factor and not just parse it.
 * @param {string} equation - The equation you want to factor.
 * @returns {number[]} The resulting number.
 */
export const factor = (equation: string): number[] => {
  // Parses the equation to find all the powers
  let powers: number[] = [0];
  while (true) {
    const idx = equation.search("x");
    // Checks if an x was found
    if (idx < 0) {
      powers[powers.length - 1] = parseInt(equation);
      break;
    }
    // Finds the number
    let number = "";
    let start = idx - 1;
    while (start >= 0 && parseInt(equation.substring(start, start + 1)) > -1) {
      number = equation.substring(start, start + 1) + number;
      start--;
    }
    // Checks if it was negative
    const negative = equation.substring(start, start + 1) === "-";
    // Finds the power of the thing
    let ending = idx + 1;
    let power = "";
    if (equation.substring(ending, ending + 1) === "^") {
      ending++;
      while (
        ending < equation.length &&
        parseInt(equation.substring(ending, ending + 1)) > -1
      ) {
        power = power + equation.substring(ending, ending + 1);
        ending++;
      }
    }
    const actualNumber = number === "" ? 1 : parseInt(number);
    const actualPower = power === "" ? 1 : parseInt(power);
    // If the array is too short is makes
    if (actualPower >= powers.length) {
      powers = [...Array(actualPower - powers.length + 1).fill(0), ...powers];
    }
    powers[powers.length - 1 - actualPower] =
      actualNumber * (negative ? -1 : 1);
    equation = equation.substring(0, start) + equation.substring(ending);
    if (equation.substring(0, 1) === "+") {
      equation = equation.substring(1);
    }
  }
  return powers;
};

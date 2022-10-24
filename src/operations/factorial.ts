/**
 * Used to do factorial for a number.
 * @param {number} number - The number you want the factorial for.
 * @returns {number} The resulting number.
 */
export const factorial = (number: number): number => {
  if (number == 0) {
    return 1;
  }
  if (number < 0) {
    throw "Factorial of a negative number does not exist";
  } else if (Math.ceil(number) !== number) {
    throw "Factorial can not use a decimal";
  }
  return number * factorial(number - 1);
};

export { simpleMath } from "./simpleMath";
export { factorial } from "./operations";
/**
 * Is like the actual parseFloat(turning string to number) but allows for unlimited \- signs before the number.
 * @param {string} num - The float as a string.
 * @returns {number} The resulting number.
 */
export const _parseFloat = (num: string): number => {
  const firstNumber = num.search(/[0-9]/);
  if (firstNumber < 1) {
    return parseFloat(num);
  } else {
    return (
      parseFloat(num.substring(firstNumber)) * (firstNumber % 2 == 0 ? 1 : -1)
    );
  }
};
export interface simpleSolution {
  answer: number;
  steps: string[];
}

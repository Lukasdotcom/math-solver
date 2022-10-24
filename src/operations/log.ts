/**
 * Used to do the log of a number.
 * @param {number} number - The number you want the log for.
 * @param {number} base - The log base that you want to use.
 * @returns {number} The resulting number.
 */
export const log = (number: number, base: number): number => {
  if (number === 1) return 0;
  return Math.log(number) / Math.log(base);
};

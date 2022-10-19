import {simpleMath} from "../src/index"
// Just Does some tests for simple math
test('adds 1 + 1 to equal 2', () => {
  expect(simpleMath("1+1")).toBe(2);
});
test('adds 5+(3*2) to equal 11', () => {
  expect(simpleMath("5+(3*2)")).toBe(11);
});
test('double negative or just negative 3--2+-4 to equal 1', () => {
  expect(simpleMath("3--2+-4")).toBe(1);
});
test('double negative or just negative but more -3+-2--4 is equal to -1', () => {
  expect(simpleMath("-3+-2--4")).toBe(-1);
});
test('decimals 3.2+1.4 to equal 4.6', () => {
  expect(simpleMath("3.2+1.4")).toBe(4.6);
});
test('super crazy 4*(-2+1)^2-13/2+1.2 to equal 1', () => {
  expect(simpleMath("4*(-2+1)^2-13/2+1.2")).toBe(-1.3);
});
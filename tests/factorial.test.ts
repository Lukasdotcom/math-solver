import { factorial } from "../src/index";

// Just tests factorial
test("factorial of 0 is 1", () => {
  expect(factorial(0)).toBe(1);
});
test("factorial of 2 is 2", () => {
  expect(factorial(2)).toBe(2);
});
test("factorial of 10", () => {
  expect(factorial(10)).toBe(3628800);
});

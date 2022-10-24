import { log } from "../../src/index";

// Just tests logarithms
test("log of 1 is always 0", () => {
  [2, 3, 10].forEach((e) => {
    expect(log(1, e)).toBe(0);
  });
});
test("the square of a number logged with that number should always be 2", () => {
  [2, 5, 20].forEach((e) => {
    expect(log(e ** 2, e)).toBe(2);
  });
});

import { factor } from "../src/factor";
// Just Does some tests for the factoring
test("Checks if factor function can parse this-5x+2+-3x^2+10x^5", () => {
  const answer = [10, 0, 0, -3, -5, 2];
  const result = factor("-5x+2+-3x^2+10x^5");
  result.forEach((e, index) => {
    expect(answer[index]).toBe(e);
  });
});

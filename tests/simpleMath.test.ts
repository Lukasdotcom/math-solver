import { simpleMath } from "../src/index";
// Just Does some tests for simple math
test("adds 1 + 1 to equal 2", () => {
  expect(simpleMath("1+1").answer).toBe(2);
});
test("adds 5+(3*2) to equal 11", () => {
  expect(simpleMath("5+(3*2)").answer).toBe(11);
});
test("double negative or just negative 3--2+-4 to equal 1", () => {
  expect(simpleMath("3--2+-4").answer).toBe(1);
});
test("double negative or just negative but more -3+-2--4 is equal to -1", () => {
  expect(simpleMath("-3+-2--4").answer).toBe(-1);
});
test("decimals 3.2+1.4 to equal 4.6", () => {
  expect(simpleMath("3.2+1.4").answer).toBe(4.6);
});
test("factorial 2!+3 to equal 5", () => {
  expect(simpleMath("2!+3").answer).toBe(5);
});
test("super crazy 4(-2+3!)^2-13/2+1.2+log(5*3-3!+1) to equal 59.7", () => {
  expect(simpleMath("4(-2+3!)^2-13/2+1.2+log(5*3-3!+1)").answer).toBe(59.7);
});
test("Tests π+π", () => {
  expect(simpleMath("π+π").answer).toBe(6.283185307179586);
});
test("Tests e+e", () => {
  expect(simpleMath("e+e").answer).toBe(5.43656365691809);
});
test("tests functions", () => {
  expect(simpleMath("cos(π)").answer).toBe(-1);
});
test("Tests the automatic degree switching e+e", () => {
  expect(simpleMath("cos(180)").answer).toBe(-1);
});
test("Tests if the logarithms work", () => {
  expect(simpleMath("ln(e)+log(10)").answer).toBe(2);
});
test("Tests if the parenthesis stuff works", () => {
  expect(simpleMath("5ln(e)+2(3*2)(2+2)5").answer).toBe(245);
});

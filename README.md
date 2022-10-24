# Math Solver

Tries to solve any math problem. Currently all it does is the classic operators and adds them together while following order of operations. To install just run the command below:

```bash
npm i @lukasdotcom/math-solve
```

# Example

To use this all you do is have this code and change the string in the function to whatever you want to solve. Note that currently only the basic operators are supported. The simpleMath function then returns an array of steps in the key steps and returns the answer under the key answer.

```js
import { simpleMath } from "@lukasdotcom/math-solver";

simpleMath("1+1");
```

You can also use this syntax:

```js
const mathSolver = require("@lukasdotcom/math-solver");

mathSolver.simpleMath("1+1");
```

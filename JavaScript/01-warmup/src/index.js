'use strict';

const {
  abProblem,
  centuryByYearProblem,
  colorsProblem,
  fibonacciProblem,
  matrixProblem,
  numberSystemProblem,
  phoneProblem,
  smilesProblem,
  ticTacToeProblem
} = require('./warmup');

// Выведет `2`
console.info(abProblem(1, 1));
console.info(abProblem(-1, 1));
console.info(abProblem(1e11122221, 1));
console.info(
  abProblem(
    10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,
    11000785243568723458728346568792368947567823456878236745687869734586794325894356753247682453874532432837452824356847356875623456328456738457682374568732465823746587324658372465873246588
  )
);
console.info(abProblem(1.0, -17.2));

// Выведет `21`
console.info(centuryByYearProblem(2018));

// Выведет "(255, 255, 255)"
console.info(colorsProblem('#FFFFFF'));

// Выведет `1`
// console.info(fibonacciProblem('Haha'));
// console.info(fibonacciProblem(-1));
console.info(fibonacciProblem(0));
console.info(fibonacciProblem(1));
console.info(fibonacciProblem(2));
console.info(fibonacciProblem(3));
console.info(fibonacciProblem(13));

// Выведет `[
//    [1, 4, 7],
//    [2, 5, 8],
//    [3, 6, 9]
// ]`
// prettier-ignore
console.info(matrixProblem([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]));

// Выведет "1010101"
console.info(numberSystemProblem(85, 2));

// Выведет `true`
console.info(phoneProblem('8-800-333-51-73'));

// Выведет `2`
console.info(smilesProblem(':-) (-:'));

// Выведет "x"
// prettier-ignore
console.info(ticTacToeProblem([
  ['x', 'x', 'x'],
  ['o', 'o', 'x'],
  ['o', 'x', 'o']
]));

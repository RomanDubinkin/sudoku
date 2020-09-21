const { indexFinder } = require('./index-finder.js');
const { checkArray } = require('./checkArray.js');
const { updateArray } = require('./updateArray.js');

function sudokuSolver(string) {
  const sudokuArray = string.split('');
  let toContinue;
  do {
    toContinue = false;
    for (let i = 0; i < 81; i += 1) {
      if (sudokuArray[i] === '-') {
        let isPossible = new Array(10).fill('true');
        isPossible[0] = false;
        for (let j = 0; j < 3; j += 1) {
          let indices = [...indexFinder(i, j)];
          updateArray(indices, sudokuArray, isPossible);
        }
        if (checkArray(isPossible) !== -1) {
          sudokuArray[i] = checkArray(isPossible);
          toContinue = true;
        }
      }
    }
  } while (toContinue === true);
  return sudokuArray.join(' ');
}

const string = '--5-3--819-285--6-6----4-5---74-283-34976---5--83--49-15--87--2-9----6---26-495-3';
console.log(sudokuSolver(string));

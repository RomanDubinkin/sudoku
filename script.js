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
        let isPossible = new Array(10).fill(true);
        isPossible[0] = false;
        for (let j = 0; j < 3; j += 1) {
          let indices = [...indexFinder(i, j)];
          updateArray(indices, sudokuArray, isPossible);
        }
        if (isPossible[checkArray(isPossible)]) {
          sudokuArray[i] = checkArray(isPossible);
          toContinue = true;
        }
      }
    }
  } while (toContinue === true);
  return sudokuArray.join(' ');
}

const string = '1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--';
console.log(sudokuSolver(string));

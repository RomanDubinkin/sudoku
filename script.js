const { indexFinder } = require('./index-finder.js');
const { checkArray } = require('./checkArray.js');
const { updateArray } = require('./updateArray.js');

function findPossible(index, sudokuArray) {
  let isPossible = new Array(10).fill(true);
  isPossible[0] = false;
  for (let j = 0; j < 3; j += 1) {
    let indices = [...indexFinder(index, j)];
    updateArray(indices, sudokuArray, isPossible);
  }
  return isPossible;
}

function findMatch(isPossible, index, pos, sudokuArray) {
  let row = [...isPossible];
  let indices = [...indexFinder(index, pos)].filter(el => sudokuArray[el] === '-');
  indices.forEach((el) => {
    let isPossible = findPossible(el, sudokuArray);
    let indices = checkArray(isPossible, 1);
    indices.forEach((el) => row[el] = false);
  });
  return row;
}

function fillInNumber(sudokuArray) {
  let toContinue = false;
  for (let i = 0; i < 81; i += 1) {
    if (sudokuArray[i] === '-') {
      let isPossible = findPossible(i, sudokuArray);
      if (isPossible[checkArray(isPossible)]) {
        sudokuArray[i] = checkArray(isPossible);
        toContinue = true;
      }
    }
  }
  return toContinue;
}

function deduceNumber(sudokuArray) {
  let toContinue = false;
  for (let i = 0; i < 81; i += 1) {
    if (sudokuArray[i] === '-') {
      let isPossible = findPossible(i, sudokuArray);
      for (let j = 0; j < 3; j += 1) {
        let match = findMatch(isPossible, i, j, sudokuArray);
        if (isPossible[checkArray(match)]) {
          sudokuArray[i] = checkArray(match);
          toContinue = true;
          break;
        }
      }
    }
  }
  return toContinue;
}


function sudokuSolver(string) {
  const sudokuArray = string.split('');
  let toContinue;
  do {
    do { toContinue = fillInNumber(sudokuArray) } while (toContinue === true)
    toContinue = deduceNumber(sudokuArray);
  } while (toContinue === true)

  // do {
  //   toContinue = false;
  //   for (let i = 0; i < 81; i += 1) {
  //     if (sudokuArray[i] === '-') {
  //       let isPossible = findPossible(i, sudokuArray);
  //       if (isPossible[checkArray(isPossible)]) {
  //         sudokuArray[i] = checkArray(isPossible);
  //         toContinue = true;
  //       }
  //     }
  //   }
  // } while (toContinue === true);

  // do {
  //   toContinue = false;
  //   for (let i = 0; i < 81; i += 1) {
  //     if (sudokuArray[i] === '-') {
  //       let isPossible = findPossible(i, sudokuArray);
  //       for (let j = 0; j < 3; j += 1) {
  //         let match = findMatch(isPossible, i, j, sudokuArray);
  //         if (isPossible[checkArray(match)]) {
  //           sudokuArray[i] = checkArray(match);
  //           toContinue = true;
  //           break;
  //         }
  //       }
  //     }
  //   }
  // } while (toContinue === true);

  // do {
  //   toContinue = false;
  //   for (let i = 0; i < 81; i += 1) {
  //     if (sudokuArray[i] === '-') {
  //       let isPossible = findPossible(i, sudokuArray);
  //       for (let j = 0; j < 3; j += 1) {
  //         let match = findMatch(isPossible, i, j, sudokuArray);
  //         if (isPossible[checkArray(match)]) {
  //           sudokuArray[i] = checkArray(match);
  //           toContinue = true;
  //           break;
  //         }
  //       }
  //     }
  //   }
  // } while (toContinue === true);

  return sudokuArray.join(' ');
}

const string = '3-26-9--55--73----------9-----94----------1-9----57-6---85----6--------3-19-82-4-';
console.log(sudokuSolver(string));

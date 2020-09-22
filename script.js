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
      if (isPossible.indexOf(true) === -1) {
        return -1;
      }
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

function logicBasedSolver(sudokuArray) {
  let toContinue = false;
  do {
    do { toContinue = fillInNumber(sudokuArray) } while (toContinue === true)
    if (toContinue === -1) break;
    toContinue = deduceNumber(sudokuArray);
  } while (toContinue === true)
  return toContinue;
}

function guessNumber(sudokuArray) {
  let toContinue = false;
  let index = sudokuArray.indexOf('-');
  if (index === -1) {
    return toContinue;
  }
  let isPossible = findPossible(index, sudokuArray);
  let numbers = checkArray(isPossible, 1);
  let i = 0;
  do {
    let sudokuArrayCopy = [...sudokuArray];
    sudokuArray[index] = numbers[i];
    if (logicBasedSolver(sudokuArray) !== -1) {
      toContinue = guessNumber(sudokuArray);
    } else {
      toContinue = true;
    }
    if (toContinue === true) {
      sudokuArrayCopy.forEach((el, i) => sudokuArray[i] = el);
    }
    i += 1;
  } while (toContinue === true && i < numbers.length)
  return toContinue;
}

function sudokuSolver(string) {
  const sudokuArray = string.split('');
  let toContinue;
  do {
    toContinue = logicBasedSolver(sudokuArray);
  } while (toContinue === true);
  guessNumber(sudokuArray);

  return sudokuArray.join(' ');
}

const string = '--7--8------2---6-65--79----7----3-5-83---67-2-1----8----71--38-2---5------4--2--';
console.log(sudokuSolver(string));

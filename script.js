
// const indexFinder = require('./index-finder.js');
// const checkArray  = require('./checkArray.js');
// const updateArray = require('./updateArray.js');
function checkArray(isPossible, key = 0) {
  let arr = isPossible.map((el, i) => {
    if (el === true) return i;
  }).filter(el => el !== undefined);
  if (key === 0) {
    return arr.length === 1 ? arr[0] : 0
  } else {
    return arr;
  }
}

function updateArray(arr, sudoku, isPossible) {
  for (let i = 0; i < arr.length; i++) {
    const index = arr[i];
    if (sudoku[index] !== '-') {
      isPossible[sudoku[index]] = false;
    }
  }
  return isPossible;
}

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
        fillGrid(i, sudokuArray)
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
          fillGrid(i, sudokuArray)
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
    fillGrid(index, sudokuArray);
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
  for (let i = 0; i < sudokuArray.length; i += 1) {
    if (sudokuArray[i] !== '-') {
      fillGrid(i, sudokuArray)
    }
  }

  let toContinue;
  do {
    toContinue = logicBasedSolver(sudokuArray);
  } while (toContinue === true);
  guessNumber(sudokuArray);
  return sudokuArray.join(' ');
}

const string = '--7--8------2---6-65--79----7----3-5-83---67-2-1----8----71--38-2---5------4--2--';
sudokuSolver(string);



function fillGrid(index, sudokuArray) {
  let cell = document.querySelector(`#cell-${index + 1}`);
  cell.innerText = sudokuArray[index];
}

function indexFinder(index, opt) {
  function nod(x, base) {
    return (x - (x % base)) / base;
  }

  let baseColumn = index % 9;
  let baseRow = nod(index, 9);
  let array = [];
  if (opt === 0) {
    for (let i = 1; i < 9; i += 1) {
      let curr = index + i;
      let currRow = nod(curr, 9);
      let currIndex = curr - 9 * (currRow - baseRow);
      array.push(currIndex);
    }
  }
  if (opt === 1) {
    for (let i = 1; i < 9; i += 1) {
      let curr = index + 9 * i;
      let currIndex = curr % 81;
      array.push(currIndex);
    }
  }
  if (opt === 2) {
    let baseCellColumn = nod(baseColumn, 3);
    let baseCellRow = nod(baseRow, 3);
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        if (!(i === 0 && j === 0)) {
          let curr = index + 9 * i + j;
          let currColumn = curr % 9;
          let currRow = nod(curr, 9);
          let currCellColumn = nod(currColumn, 3);
          let currCellRow = nod(currRow, 3);
          let currIndex =
            curr -
            27 * (currCellRow - baseCellRow) -
            3 * (currCellColumn - baseCellColumn);
          array.push(currIndex);
        }
      }
    }
  }

  return array;
}


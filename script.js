// const fs = require('fs');
// const indexFinder = require('./index-finder.js');
// const checkArray  = require('./checkArray.js');
// const updateArray = require('./updateArray.js');

function updateArray(arr, sudoku, isPossible) {
  for (let i = 0; i < arr.length; i++) {
    const index = arr[i];
    if (sudoku[index] !== '-') {
      isPossible[sudoku[index]] = false;
    }
  }
  return isPossible;
}

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
        setTimeout(() => {
          fillGrid(i, sudokuArray)
        }, 1000)
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
          setTimeout(() => {
            fillGrid(i, sudokuArray)
          }, 1000)
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
    toContinue = deduceNumber(sudokuArray);
  } while (toContinue === true)
  return toContinue;
}

function guessNumber(sudokuArray) {
  let sudokuCopy = [...sudokuArray];
  let i = 0;
  while (sudokuArray[i] !== '-') { i += 1 };
  let isPossible = findPossible(i, sudokuArray);
  let numbers = checkArray(isPossible, 1);
  sudokuArray[i] = numbers[0];
  logicBasedSolver(sudokuArray);
  // 1. ugadali pravil'no, puzzle slozhilsja+ => proverit' eto uslovie
  // 2. ne ugadali 4to eto zna4it?=> dolzhno vozniknut' protivore4ie => popravit' funkciju findPossible
  // ozidaem resultat' vozvrawenia funkcii checkArray(isPossible) [] --pustoi massive , togda otkatyvemsja nazad!
  // i vybiraem novoe chislo iz vozmozhnyh
  // 3. logika sdalas', no puzzle ewe ne slozhilsja i nam nado ugadyvat' snova!!!!
}









function sudokuSolver(string) {
  const sudokuArray = string.split('');
  for (let i = 0; i < sudokuArray.length; i += 1){
    if (sudokuArray[i] !== '-'){
      setTimeout(() => {
        fillGrid(i, sudokuArray)
     }, 1000)
    }
  }
  
  let toContinue;
  do {
    toContinue = logicBasedSolver(sudokuArray);
  } while (toContinue === true);



  // do {
  //   do { toContinue = fillInNumber(sudokuArray) } while (toContinue === true)
  //   toContinue = deduceNumber(sudokuArray);
  // } while (toContinue === true)

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

const string = '3---------5-7-3--8----28-7-7------43-----------39-41-54--3--8--1---4----968---2--';
console.log(sudokuSolver(string));



function fillGrid(index, sudokuArray){
  // let str = `cell-${index}`;

  let cell = document.querySelector(`#cell-${index+1}`);
  cell.innerText = sudokuArray[index];
}



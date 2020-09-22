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

const string = '3-26-9--55--73----------9-----94----------1-9----57-6---85----6--------3-19-82-4-';
console.log(sudokuSolver(string));

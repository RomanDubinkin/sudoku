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
          let currIndex = curr - 27 * (currCellRow - baseCellRow) - 3 * (currCellColumn - baseCellColumn);
          array.push(currIndex);
        }
      }
    }
  }

  return array;
}

module.exports = {
  indexFinder,
};

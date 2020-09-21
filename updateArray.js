const isPossible = [true, true, false, false, false, true, false, false, false, false];
const sudoku = [1, 58, 2, '_', '_', '_', '_', '_', '_', '_'];

function updateArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    const index = arr[i];
    if (typeof (sudoku[index]) === 'number') {
      isPossible[index] = false;
    }
  }
  return isPossible;
}

module.exports = {
  updateArray,
};


function updateArray(arr, sudoku, isPossible) {
  for (let i = 0; i < arr.length; i++) {
    const index = arr[i];
    if (sudoku[index] !== '-') {
      isPossible[sudoku[index]] = false;
    }
  }
  return isPossible;
}

module.exports = {
  updateArray,
};

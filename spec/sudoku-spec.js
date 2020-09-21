// describe('Function updateArray check', () => {
//   describe('Check first index', () => {
//     it('function updateArray', () => {
//       expect(updateArray([0])).toEqual([false, true, false, false, false, true, false, false, false, false]);
//     });
//   });
// });

// describe('Function updateArray check', () => {
//   describe('Check last index', () => {
//     it('function updateArray', () => {
//       expect(updateArray([9])).toEqual([true, true, false, false, false, true, false, false, false, false]);
//     });
//   });
// });

describe('sudokuSolver(string): returns solved sudoku puzzle as an array', () => {
  it('fill the only empty cell', () => {
    let s = '-13854297794162385258739164839427516127596438465318729582941673371685942946273851';
    let solved = '613854297794162385258739164839427516127596438465318729582941673371685942946273851';
    expect(sudokuSolver(s)).toBeEqual(solved);
  })
})
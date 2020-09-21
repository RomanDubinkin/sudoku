possibleNumber = [0,1,2,3,4,5,6,7,8,9];
isPossible = [false, true,true, true, true, true, true,true, true, true]

3 4 _   _ 2 _    8 6 _

isPossible = [false, true,false, false, false, true, false,true, false, true]

_
_
4

_
_
9

7
1
_

isPossible = [false, false,false, false, false, true, false,false, false, false]

input ='34__2_86_...` => 
// 0. Convert string into array = input.split('');
// 1. Find empty cell => function() return index // Keti делаешь запрос у функции updateCell(index), которая возвращает либо число, либо ошибку -1
//2. Find all cells in the ROW with cell in question, update isPossible array --Roman
//3. Check, if there is only one possible number left ? fill the cell, move onto the next cell=> step 1

//4. Find all cells in the COLUMN with cell in question, update isPossible array -- updateArray ?
//5. Check, if there is only one possible number left ? fill the cell, move onto the next cell=> step 1 checkArray

//6. Find all cells in the SUBCELL(3x3) with cell in question, update isPossible array --Roman function(index, row/column/subcell: 0,1,2)=> array of indexes indexFinder
//7. Check, if there is only one possible number left ? fill the cell, move onto the next cell=> step 1

//8. Move through all cells, if updated NONE ? give up : return to step 1.

function updateCell(index) {
let isPossible = [];
isPossible = updateArray(index); Anton
 return checkArray(isPossible) { Gayane
  return number;
}
}
function indexFinder(index,opt) { Roman
  return [];
}
let rowArray = indexFinder(index,0);
let columnArray = indexFinder(index,1);
let cellArray = indexFinder(index,2);

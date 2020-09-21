let boardString = '1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--';

function stringToArray(boardString){
  boardString = boardString.split('');
  boardString = boardString.map((item) => {
    if (item === '-') {
      return item = ('_');
    }
    return item;
  });
  return boardString;
}


// console.log(stringToArray(boardString));

// 1. Find empty cell => function() return index 
// Keti делаешь запрос у функции updateCell(index), которая возвращает либо число, либо ошибку -1

function emptyCell(x){
  let result;
  if (x === ' ') {
    return 'ERROR!'
  } else {
    return x;
  }
  return result;
}

console.log(emptyCell(''));

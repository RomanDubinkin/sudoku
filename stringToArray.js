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


console.log(stringToArray(boardString));

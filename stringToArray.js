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

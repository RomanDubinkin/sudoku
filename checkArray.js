// function returns index of true's element
function checkArray(isPossible) {
  let indices = [];
  let element = 'true';
  let idx = isPossible.indexOf(element);
  if (idx === -1) {
    return 0;
  }
  while (idx !== -1) {
    indices.push(idx);
    idx = isPossible.indexOf(element, idx + 1);
  }
  return indices[0];
  
//   let arr = isPossible.filter(el => el === true);
//   if (arr.length !== 1) {
//     return 0;
//   } else {
//     return isPossible.indexOf(true);
//   }
}
module.exports = {
  checkArray: checkArray,
};

// function returns index of true's element
function checkArray(isPossible, key = 0) {
  // let indices = [];
  // let element = 'true';
  // let idx = isPossible.indexOf(element);
  // if (idx === -1) {
  //   return 0;
  // }
  // while (idx !== -1) {
  //   indices.push(idx);
  //   idx = isPossible.indexOf(element, idx + 1);
  // }
  // return indices[0];

  let arr = isPossible.map((el, i) => {
    if (el === true) return i;
  }).filter(el => el !== undefined);
  if (key === 0) {
    return arr.length === 1 ? arr[0] : 0
  } else {
    return arr;
  }
}
module.exports = {
  checkArray: checkArray,
};

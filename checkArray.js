// function returns index of true's element
function checkArray(isPossible) {
  let indices = [];
  let element = true;
  let idx = isPossible.indexOf(element);
  while (idx != -1) {
    indices.push(idx);
    idx = isPossible.indexOf(element, idx + 1);
  }
  if (indices.length > 1 && indices.length < 1) {
    return -1;
  }
  return indices[0];
}
module.exports = {
  checkArray,
};

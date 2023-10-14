export function createArrayFrom1ToN(n) {
  const resultArray = [];
  for (let i = 1; i <= n; i++) {
    resultArray.push(i);
  }
  return resultArray;
}

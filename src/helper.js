export function createArrayFrom1ToN(n) {
  const resultArray = [];
  for (let i = 1; i <= n; i++) {
    resultArray.push(i);
  }
  return resultArray;
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
export const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

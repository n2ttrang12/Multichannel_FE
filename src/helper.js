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

export const formatDateToDDMMYYYY = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

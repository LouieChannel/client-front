function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromLocalStorage(key) {
  return localStorage.get(key);
}

export { saveToLocalStorage, getFromLocalStorage };

function saveToLocalStorage(key, value) {
	localStorage.setItem(key, value);
}

function getFromLocalStorage(key) {
	return localStorage.getItem(key);
}

function removeFromLocalStorage(key) {
	return localStorage.removeItem(key);
}

const convertArrayToObject = (array, key) => {
	const initialValue = {};
	return array.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: item,
		};
	}, initialValue);
};

export { saveToLocalStorage, removeFromLocalStorage, getFromLocalStorage, convertArrayToObject };

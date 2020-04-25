function saveToLocalStorage(key, value) {
	localStorage.setItem(key, value);
}

function getFromLocalStorage(key) {
	return localStorage.getItem(key);
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

export { saveToLocalStorage, getFromLocalStorage, convertArrayToObject };

import React from 'react';

function Status0() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
			<circle cx="6" cy="6" r="6" fill="#C4C4C4"></circle>
		</svg>
	);
}

function Status1() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
			<circle cx="6" cy="6" r="6" fill="#00D609"></circle>
		</svg>
	);
}

function Status2() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
			<circle cx="6" cy="6" r="6" fill="#FFE600"></circle>
		</svg>
	);
}

function Status3() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
			<circle cx="6" cy="6" r="6" fill="#DF0000"></circle>
		</svg>
	);
}

function getStatusIcon(status) {
	switch (status) {
		case 0:
			return <Status0 />;
		case 1:
			return <Status1 />;
		case 2:
			return <Status2 />;
		case 3:
			return <Status3 />;
		default:
			return <Status0 />;
	}
}

export { Status0, Status1, Status2, Status3, getStatusIcon };

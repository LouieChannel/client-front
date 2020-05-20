import axios from 'axios';
import { removeFromLocalStorage, saveToLocalStorage } from '../utils/helpers';

const BASE_URL = process.env.BASE_URL || 'http://34.77.137.219';

function getRedirect(req, data) {
	console.log(data, '--');
	if (req.data && req.data.access_token) {
		saveToLocalStorage('access_token', req.data.access_token);
	}

	if (req.data && req.data.role) {
		saveToLocalStorage('role', req.data.role);
	}

	if (req.data && req.data.username) {
		saveToLocalStorage('username', req.data.username);
	}

	if (data.role === 'Driver') {
		return '/driver';
	}

	if (data.role === 'Logist') {
		return '/logist';
	}

	return '/';
}

async function requestLogin({ email, password }) {
	try {
		console.log({
			login: email,
			password: password,
		});

		const req = await axios.post(`${BASE_URL}/auth`, {
			login: email,
			password: password,
		});

		const data = await req.data;

		window.location = await getRedirect(req, data);
	} catch (error) {
		console.log('error', error.message);
		return false;
	}
}

async function requestSignUp({ email, password, fullName, role }) {
	try {
		console.log({ email, password, fullName, role });
		const req = await axios.post(`${BASE_URL}/account`, {
			login: email,
			password: password,
			fullName: fullName,
			role: role,
		});

		const data = await req.data;

		window.location = await getRedirect(req, data);
	} catch (error) {
		console.log('error', error);
		return false;
	}
}

async function requestLogout() {
	try {
		await removeFromLocalStorage('access_token');
		window.location = '/';
	} catch (error) {
		console.log('error', error);
	}
}

export { requestLogin, requestLogout, requestSignUp, getRedirect };

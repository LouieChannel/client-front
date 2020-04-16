import axios from 'axios';
import { saveToLocalStorage } from '../helpers';

const BASE_URL = process.env.BASE_URL || 'http://34.77.137.219';

async function requestLogin({ email, password }) {
  try {
    const req = await axios.post(`${BASE_URL}/auth`, {
      login: email,
      password: password,
    });

    const data = req.data;

    if (req.data && req.data.access_token) {
      saveToLocalStorage('access_token', req.data.access_token);
    }

    if (req.data && req.data.access_token) {
      saveToLocalStorage('role', req.data.role);
    }

    if (data.role === 'Driver') {
      window.location = '/driver';
    }

    if (data.role === 'Logist') {
      window.location = '/logist';
    }
  } catch (error) {
    console.log('error', error);
  }
}

async function requestLogout() {
  try {
    axios.get(`${BASE_URL}/auth/logout`);
  } catch (error) {
    console.log('error', error);
  }
}

export { requestLogin, requestLogout };

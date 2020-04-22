import axios from 'axios';
import { saveToLocalStorage } from '../utils/helpers';

const BASE_URL = process.env.BASE_URL || 'http://34.77.137.219';

function getRedirect(req, data) {
  if (req.data && req.data.access_token) {
    saveToLocalStorage('access_token', req.data.access_token);
  }

  if (req.data && req.data.access_token) {
    saveToLocalStorage('role', req.data.role);
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
    const req = await axios.post(`${BASE_URL}/auth`, {
      login: email,
      password: password,
    });

    const data = await req.data;

    const href = getRedirect(req, data);
    window.location = href;
  } catch (error) {
    console.log('error', error);
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

    const href = getRedirect(req, data);
    window.location = href;
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

export { requestLogin, requestLogout, requestSignUp };

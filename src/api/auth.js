import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://34.77.137.219';

async function requestLogin({ email, password }) {
  try {
    const req = await axios.get(`${BASE_URL}/auth/${email}-${password}`);
    console.log(req);
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

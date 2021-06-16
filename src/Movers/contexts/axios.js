import axios from 'axios';
axios.defaults.headers['authorization'] = localStorage.getItem('moverToken');
const instance = axios.create({
  baseURL:
    process.env.REACT_APP_BACKEND_API_URL ||
    'https://gt-api.moversconnections.com/api/'

  // baseURL:
  //   /*process.env.REACT_APP_BACKEND_API_URL ||*/ 'http://localhost:3001/api/'
});

export const BASE_URL = 'https://gt-api.moversconnections.com/api/';
// export const BASE_URL = 'http://localhost:3001/api/';
export default instance;

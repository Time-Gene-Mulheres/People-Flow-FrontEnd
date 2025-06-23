import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rh-people-flow.onrender.com/'
});

export default api;
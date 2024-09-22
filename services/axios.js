import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://vital-plus.xyz:3000/api',
});

export default instance;
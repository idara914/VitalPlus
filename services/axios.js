import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://129.146.244.77:3000/api',
});

export default instance;
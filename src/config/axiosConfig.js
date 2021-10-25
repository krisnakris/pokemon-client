import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:3006/pokemon',
});

export default axiosConfig;

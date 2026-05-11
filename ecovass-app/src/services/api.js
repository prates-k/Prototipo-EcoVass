import axios from 'axios';

const IP_COMPUTADOR = '192.168.1.48';

const api = axios.create({
  baseURL: `http://${IP_COMPUTADOR}:8000/api/`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export default api;
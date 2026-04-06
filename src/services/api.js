// api.js
import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

// Axios instance
const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
);


export const login = (data)=>api.post(`/auth/login` , data)
import axios from 'axios';
import { getCookie } from '../utils/cookie-helper.util';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${getCookie('accessToken')}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

import axios from 'axios';
import { getCookie } from '../utils/cookie-helper.util';
import { validatedEnv } from '#/configs/env.config';

export const apiClient = axios.create({
  baseURL: validatedEnv.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${getCookie('accessToken')}`;
    }

    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

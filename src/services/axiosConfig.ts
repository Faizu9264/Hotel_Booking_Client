// axiosConfig.ts
import axios, { AxiosInstance } from 'axios';

const createAxiosInstance = (baseURL: string, tokenKey: string): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
  });

  // Request interceptor
  instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(tokenKey);

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  });

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && error.response.data.message === 'Token expired') {
        // Handle token expiration
        console.log('Access token expired');

        originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem(tokenKey)}`;
        return axios(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;

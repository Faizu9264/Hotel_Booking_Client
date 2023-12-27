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
    console.log('Request interceptor', config);

    return config;
  });

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      console.log('Response interceptor', response);

      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 ) {
        console.log('Access token expired',error.response);

        originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem(tokenKey)}`;
        return  axios(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;

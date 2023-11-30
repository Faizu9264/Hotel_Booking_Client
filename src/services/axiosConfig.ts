// axiosConfig.ts
import axios, { AxiosInstance } from 'axios';
import { getRefreshToken, removeRefreshToken } from './tokenHandler';

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true, // Ensure credentials are included in the request
  });

  instance.interceptors.request.use((config) => {
    // Add the access token to the request headers
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='));

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken.split('=')[1]}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Check if the error is due to an expired access token
      if (error.response?.status === 401 && error.response.data.message === 'Token expired') {
        const refreshToken = getRefreshToken();

        // Make a request to refresh the access token using the refresh token
        if (refreshToken) {
          try {
            const newAccessToken = await axios.post(`${baseURL}/refresh`, { refreshToken });
            
            // Set the new access token in the cookies
            document.cookie = `accessToken=${newAccessToken.data.accessToken}; path=/`;

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken.data.accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error('Error refreshing access token:', refreshError);
            removeRefreshToken();
            // Redirect to the login page or handle the error as needed
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;

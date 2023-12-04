// // axiosConfig.ts
// import axios, { AxiosInstance } from 'axios';
// import { getRefreshToken, removeRefreshToken } from './tokenHandler';

// const createAxiosInstance = (baseURL: string): AxiosInstance => {
//   const instance: AxiosInstance = axios.create({
//     baseURL,
//     withCredentials: true, 
//   });

//   instance.interceptors.request.use((config) => {

//     const accessToken = document.cookie
//       .split('; ')
//       .find((row) => row.startsWith('accessToken='));

//     if (accessToken) {
//       config.headers['Authorization'] = `Bearer ${accessToken.split('=')[1]}`;
//     }
//     return config;
//   });

//   instance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (error) => {
//       const originalRequest = error.config;

//       if (error.response?.status === 401 && error.response.data.message === 'Token expired') {
//         const refreshToken = getRefreshToken();

//         if (refreshToken) {
//           try {
//             const newAccessToken = await axios.post(`${baseURL}/refresh`, { refreshToken });
   
//             document.cookie = `accessToken=${newAccessToken.data.accessToken}; path=/`;

//             originalRequest.headers['Authorization'] = `Bearer ${newAccessToken.data.accessToken}`;
//             return axios(originalRequest);
//           } catch (refreshError) {
//             console.error('Error refreshing access token:', refreshError);
//             removeRefreshToken();
            
//           }
//         }
//       }

//       return Promise.reject(error);
//     }
//   );

//   return instance;
// };

// export default createAxiosInstance;


import axios, { AxiosInstance } from 'axios';
import { getRefreshToken, removeRefreshToken } from './tokenHandler';

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
  });

  // Request interceptor
  instance.interceptors.request.use((config) => {
    
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='));

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken.split('=')[1]}`;
    }
    console.log('inside axios',config);
    
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
        const refreshToken = getRefreshToken();

        if (refreshToken) {
          try {
            const newAccessToken = await axios.post(`${baseURL}/refresh`, { refreshToken });

            document.cookie = `accessToken=${newAccessToken.data.accessToken}; path=/`;

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken.data.accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error('Error refreshing access token:', refreshError);
            removeRefreshToken();
           
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;

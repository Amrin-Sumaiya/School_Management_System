import axios from 'axios';

import { baseUrl } from './baseUrl';

// Make a instance of axios
const axiosAuthInstance = axios.create({
  baseURL: baseUrl,
  timeout: 300000,
  message: "It's took too long to get response from server",
});

// Add a request interceptor
axiosAuthInstance.interceptors.request.use(
  async (config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response || error.message);
  }
);

axiosAuthInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      error.response = {
        data: {
          message:
            'Cannot connect to the server right now, please try again later.',
          status: 500,
        },
      };
    }

    if (error.response.status === 404) {
      error.response = {
        data: { message: '404 Not Found, Unexpected error.', status: 404 },
      };
    }
    if (error.response.status === 400) {
      // console.log('error.response', error.response);

      error.response = {
        data: { message: error.response?.data?.message, status: 400 },
      };
    }
    if (error.response.status === 401) {
      localStorage.clear();
      location.reload();
    }

    return Promise.reject(error);
  }
);
export default axiosAuthInstance;

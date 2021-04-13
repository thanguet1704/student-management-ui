import axios from 'axios';
import dotenv from 'dotenv';
import queryString from 'query-string';

dotenv.config();

export const axiosClient = axios.create({
  baseURL: `http://localhost:8000`,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

// axiosClient.interceptors.response.use((res) => {
//   if (res && res.data) {
//     return res.data;
//   }
// });

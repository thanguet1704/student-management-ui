import queryString from 'query-string';
import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${Cookies.get('hcmaid')}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
  credentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

// axiosClient.interceptors.response.use((res) => {
//   if (res && res.data) {
//     return res.data;
//   }
// });

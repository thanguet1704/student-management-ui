import { axiosClient } from './config';

export default class LoginApi {
  auth = () => {
    const url = '/auth';
    return axiosClient.post(url);
  };
}

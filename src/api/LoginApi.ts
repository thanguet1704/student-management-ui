import { axiosClient } from './config';

interface bodyLogin {
  username: string;
  password: string;
}

export default class LoginApi {
  login(body: bodyLogin) {
    const url = '/login';

    return axiosClient.post(url, body);
  }
}

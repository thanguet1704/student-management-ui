import { axiosClient } from './config';

interface IBodyLogin {
  username: string;
  password: string;
}

export default class LoginApi {
  login(body: IBodyLogin) {
    const url = '/login';

    return axiosClient.post(url, body);
  }
}

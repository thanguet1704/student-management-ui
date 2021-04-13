import { axiosClient } from './config';

interface IUpdateAccount {
  username: string;
  oldPassword: string;
  newPassword: string;
}

export default class AccountApi {
  updateAccount = (body: IUpdateAccount) => {
    const url = '/account';
    return axiosClient.patch(url, body);
  };
}

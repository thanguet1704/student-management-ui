import { axiosClient } from './config';

export default class StudentApi {
  getStudents = async (params: {}) => {
    const url = '/student/attendence';
    return axiosClient.get(url, params);
  };
}

import { axiosClient } from './config';

export default class ScheduleApi {
  getSubjects = async () => {
    const url = '/subjects';

    return await axiosClient.get(url);
  };
}

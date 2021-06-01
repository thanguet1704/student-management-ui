import 'date-fns';
import { useEffect, useState } from 'react';
import { TableReportAttendence } from './components/TableReportAttendence';
import { axiosClient } from '../../../api/config';
import moment from 'moment';
import { DateFormat } from '../../../common/interface';

const limit = 12;

const AdminAttendence = () => {
  const [auth, setAuth] = useState({});
  const [attendenceData, setAttendenceData] = useState({
    totalPage: 0,
    data: [],
  });
  const [searchNameAttendence, setSearchNameAttendence] = useState('');
  const [dateAttendence, setDateAttendence] = useState(
    new Date(moment(new Date()).format(DateFormat)).toISOString()
  );
  const [offsetAttendence, setOffsetAttendence] = useState(0);
  const [semester, setSemester] = useState(0);
  const [classObject, setClassObject] = useState(0);

  const handleAuthorization = () => {
    axiosClient
      .post('/auth')
      .then((res) => setAuth(res.data))
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.reload();
        }
      });
  };

  const handleGetAttendences = () => {
    axiosClient
      .get(
        `/attendence?semesterId=${semester?.id}&classId=${
          classObject?.id
        }&searchName=${encodeURIComponent(
          searchNameAttendence
        )}&date=${encodeURIComponent(
          dateAttendence
        )}&limit=${limit}&offset=${offsetAttendence}`
      )
      .then((res) => {
        const data = res.data.data.map((attendence, index) => ({
          stt: index + 1 + offsetAttendence,
          category: attendence.category,
          date: moment(attendence.date).format('DD-MM-YYYY'),
          msv: attendence.msv,
          name: attendence.name,
          status: attendence.status,
          timeIn: attendence.timeIn,
          timeOut: attendence.timeOut,
        }));
        setAttendenceData({ totalPage: res.data.totalPage, data });
      })
      .catch((error) => {});
  };

  useEffect(() => {
    handleAuthorization();
    handleGetAttendences();
  }, [
    searchNameAttendence,
    dateAttendence,
    offsetAttendence,
    semester,
    classObject,
  ]);

  return (
    <div>
      <TableReportAttendence
        attendenceData={attendenceData}
        setAttendenceData={setAttendenceData}
        setSearchNameAttendence={setSearchNameAttendence}
        setDateAttendence={setDateAttendence}
        setOffsetAttendence={setOffsetAttendence}
        dateAttendence={dateAttendence}
        auth={auth}
        semester={semester}
        classObject={classObject}
        setSemester={setSemester}
        setClassObject={setClassObject}
        handleGetAttendences={handleGetAttendences}
      />
    </div>
  );
};

export default AdminAttendence;

import { Breadcrumb, Layout, message } from 'antd';
import 'date-fns';
import { useEffect, useState } from 'react';
import { TableReportAttendence } from './components/TableReportAttendence';
import { useHistory } from 'react-router-dom';
import { axiosClient } from '../../../api/config';
import Cookies from 'js-cookie';

const { Content } = Layout;

const AdminAttendence = () => {
  const history = useHistory();
  const [auth, setAuth] = useState({});
  const [attendenceData, setAttendenceData] = useState({
    totalPage: 0,
    data: [],
  });
  const [searchNameAttendence, setSearchNameAttendence] = useState('');
  const [dateAttendence, setDateAttendence] = useState(
    new Date().toISOString()
  );
  const [offsetAttendence, setOffsetAttendence] = useState(0);

  const handleAuthorization = () => {
    // axiosClient
    //   .post('/auth')
    //   .then((res) => setAuth(res.data))
    //   .catch((err) => {
    //     if (err.response.status === 401) {
    //       message.error('Phiên đăng nhập đã hết hạn');
    //       localStorage.clear();
    //       history.push('/');
    //     }
    //   });
  };

  const handleGetAttendences = () => {
    axiosClient
      .get(
        `/attendence?searchName=${encodeURIComponent(
          searchNameAttendence
        )}&date=${encodeURIComponent(
          dateAttendence
        )}&limit=15&offset=${offsetAttendence}`
      )
      .then((res) => {
        const data = res.data.data.map((attendence, index) => ({
          stt: index + 1,
          ...attendence,
        }));
        setAttendenceData({ totalPage: res.data.totalPage, data });
      })
      .catch((error) => {});
  };

  useEffect(() => {
    console.log(Cookies.get('hcmaid'));
    handleAuthorization();
    handleGetAttendences();
  }, [searchNameAttendence, dateAttendence, offsetAttendence]);

  return (
    <div>
      <TableReportAttendence
        attendenceData={attendenceData}
        setAttendenceData={setAttendenceData}
        setSearchNameAttendence={setSearchNameAttendence}
        setDateAttendence={setDateAttendence}
        setOffsetAttendence={setOffsetAttendence}
      />
    </div>
  );
};

export default AdminAttendence;

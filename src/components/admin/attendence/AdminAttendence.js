import { Breadcrumb, Layout } from 'antd';
import 'date-fns';
import { useEffect, useState } from 'react';
import { TableReportAttendence } from './components/TableReportAttendence';
import { axiosClient } from '../../../api';

const { Content } = Layout;

const AdminAttendence = () => {
  const [attendenceData, setAttendenceData] = useState({
    totalPage: 0,
    data: [],
  });
  const [searchNameAttendence, setSearchNameAttendence] = useState('');
  const [dateAttendence, setDateAttendence] = useState(
    new Date().toISOString()
  );
  const [offsetAttendence, setOffsetAttendence] = useState(0);
  const handleGetAttendences = () => {
    axiosClient
      .get(
        `/attendence?searchName=${encodeURIComponent(
          searchNameAttendence
        )}&data=${encodeURIComponent(
          dateAttendence
        )}&limit=15&offset=${offsetAttendence}`
      )
      .then((res) => setAttendenceData(res.data));
  };

  useEffect(() => {
    handleGetAttendences();
  }, [searchNameAttendence, dateAttendence, offsetAttendence]);

  return (
    <div>
      <Breadcrumb
        style={{
          margin: '16px 0',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}
      >
        <Breadcrumb.Item style={{ color: '#5BC3B2', fontWeight: 'bold' }}>
          THÔNG TIN ĐIỂM DANH
        </Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: '#fff',
        }}
      >
        <TableReportAttendence
          attendenceData={attendenceData}
          setAttendenceData={setAttendenceData}
          setSearchNameAttendence={setSearchNameAttendence}
          setDateAttendence={setDateAttendence}
          setOffsetAttendence={setOffsetAttendence}
        />
      </Content>
    </div>
  );
};

export default AdminAttendence;

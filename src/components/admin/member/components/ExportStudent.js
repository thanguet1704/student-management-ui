import { CSVLink } from 'react-csv';
import { Button } from 'antd';
import { FileExcelFilled } from '@ant-design/icons';
import { useState } from 'react';
import moment from 'moment';
import { axiosClient } from '../../../../api';

const headers = [
  { label: 'STT', key: 'stt' },
  { label: 'Họ và tên', key: 'name' },
  { label: 'Mã học viên', key: 'msv' },
  { label: 'Lớp', key: 'class' },
  { label: 'Viện', key: 'institua' },
  { label: 'Địa chỉ', key: 'address' },
];

const ExportStudent = (props) => {
  const [data, setData] = useState([]);

  const handelGetData = () => {
    axiosClient.get('/users/students').then((res) => {
      const data = res.data.data.map((item, index) => ({
        stt: index + 1,
        ...item,
      }));

      setData(data);
    });
  };

  const csvReport = {
    filename: `Danh sách học viên ${moment(new Date()).format(
      'DD-MM-YYYY'
    )}.csv`,
    headers,
    data,
    onclick: handelGetData,
  };

  return (
    <CSVLink {...csvReport}>
      <Button
        icon={<FileExcelFilled style={{ color: '#366F38' }} />}
        size="large"
        style={{ borderRadius: 5 }}
      >
        Xuất danh sách
      </Button>
    </CSVLink>
  );
};

export default ExportStudent;

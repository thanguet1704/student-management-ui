import { CSVLink } from 'react-csv';
import { Button } from 'antd';
import { FileExcelFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { axiosClient } from '../../../../api';

const headers = [
  { label: 'STT', key: 'stt' },
  { label: 'Họ và tên', key: 'name' },
  { label: 'Mã học viên', key: 'msv' },
  { label: 'Lớp', key: 'class' },
  { label: 'Viện', key: 'institua' },
  { label: 'Địa chỉ', key: 'address' },
  { label: 'Email', key: 'email' },
  { label: 'Giới tính', key: 'gender' },
  { label: 'Ngày sinh', key: 'birthday' },
];

const ExportStudent = (props) => {
  const [data, setData] = useState([]);

  const handelGetData = () => {
    axiosClient
      .get(`/users/students?classId=${props.classObject?.id}`)
      .then((res) => {
        const data = res.data.data.map((item, index) => ({
          stt: index + 1,
          name: item.name,
          msv: item.msv,
          email: item.email,
          gender: item.gender,
          class: item.class.name,
          institua: item.institua,
          address: item.address,
          birthday: item.birthday,
        }));

        setData(data);
      });
  };

  useEffect(() => {
    handelGetData();
  }, [props.classObject]);

  const csvReport = {
    filename: `Danh sách học viên ${moment(new Date()).format(
      'DD-MM-YYYY'
    )}.csv`,
    headers,
    data,
  };

  return (
    <CSVLink {...csvReport} onClick={() => handelGetData()}>
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

import { Button } from 'antd';
import { FileExcelFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';
import { CSVLink } from 'react-csv';
import moment from 'moment';

const headers = [
  { label: 'STT', key: 'stt' },
  { label: 'Họ và tên', key: 'name' },
  { label: 'Mã học viên', key: 'msv' },
  { label: 'Chuyên đề', key: 'category' },
  { label: 'Thời gian vào', key: 'timeIn' },
  { label: 'Thời gian ra', key: 'timeOut' },
  { label: 'Ngày', key: 'date' },
  { label: 'Trạng thái', key: 'status' },
];

const ExportFile = (props) => {
  const [data, setData] = useState([]);

  const csvReport = {
    filename: `Điểm danh ${moment(props.dateAttendence).format(
      'DD-MM-YYYY'
    )}.csv`,
    headers,
    data,
  };

  const hanleGetDate = () => {
    axiosClient.get(`/attendence?date=${props.dateAttendence}`).then((res) => {
      const mappingDate = res.data.data.map((item, index) => ({
        stt: index + 1,
        name: item.name,
        msv: item.msv,
        category: item.category,
        timeIn: moment(item.timeIn).format('HH:MM:SS'),
        timeOut: moment(item.timeOut).format('HH:MM:SS'),
        date: moment(new Date(item.date)).format('DD:MM:YYYY'),
        status:
          item.status === 'attend'
            ? 'Có mặt'
            : item.status === 'absent'
            ? 'Vắng'
            : 'Muộn',
      }));

      setData(mappingDate);
    });
  };

  useEffect(() => {
    hanleGetDate();
  }, [props.dateAttendence]);

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

export default ExportFile;

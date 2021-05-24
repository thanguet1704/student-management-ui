import { Table, Typography, Space, Select } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { axiosClient } from '../../../api';
import { DateFormat } from '../../../common/interface';

const { Option } = Select;
const mappingDay = [
  { value: 'Monday', display: 'Thứ 2' },
  { value: 'Tuesday', display: 'Thứ 3' },
  { value: 'Wednesday', display: 'Thứ 4' },
  { value: 'Thursday', display: 'Thứ 5' },
  { value: 'Friday', display: 'Thứ 6' },
  { value: 'Saturday', display: 'Thứ 7' },
  { value: 'Sunday', display: 'Chủ nhật' },
];
const columns = [
  {
    title: 'Thứ.Ngày',
    dataIndex: 'learnDate',
    key: 'learnDate',
    render: (date) => {
      const day = mappingDay.find(
        (d) => d.value === moment(new Date()).locale('vi').format('dddd')
      );

      return (
        <div>
          <Typography>{day.display}</Typography>
          <Typography>{moment(new Date(date)).format(DateFormat)}</Typography>
        </div>
      );
      // return `${day.display}.${moment(new Date(date)).format(DateFormat)}`;
    },
  },
  {
    title: 'Môn học',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Chuyên đề',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Buổi',
    dataIndex: 'session',
    key: 'session',
  },
  {
    title: 'Số tiết',
    dataIndex: 'lession',
    key: 'lession',
  },
  {
    title: 'Giảng viên (Điện thoại)',
    dataIndex: 'teacher',
    key: 'teacher',
  },
  {
    title: 'Địa điểm',
    dataIndex: 'classroom',
    key: 'classroom',
  },
];

export const TableStudentSchedule = (props) => {
  const [semester, setSemester] = useState();
  const [semesters, setSemesters] = useState([]);
  const [schedules, setSchedules] = useState();

  const handleGetSemesters = () => {
    axiosClient.get('/semesters').then((res) => {
      setSemesters(res.data);
      setSemester(res.data[0]);
    });
  };

  const handleGetSchedule = () => {
    axiosClient.get(`/schedule?semesterId=${semester?.id}`).then((res) => {
      const data = res.data.map((item) => ({
        id: item.id,
        learnDate: item.date,
        category: item.category,
        session: item.session.title,
        lession: item.lession,
        teacher: `${item.teacher.name} (${item.teacher.phone})`,
        subject: item.subject,
        classroom: item.classroom,
      }));

      setSchedules(data);
    });
  };

  const handleChangeSemester = (value) => {
    const s = semesters?.find((item) => item.id === value);
    setSemester(s);
  };

  useEffect(() => {
    handleGetSemesters();
  }, []);

  useEffect(() => {
    handleGetSchedule();
  }, [semester]);

  return (
    <div>
      <Space style={{ marginBottom: 20 }}>
        <Typography>Chọn Học kỳ:</Typography>
        <Select
          defaultValue={semester?.id}
          style={{ width: '20vw' }}
          size="large"
          onChange={handleChangeSemester}
        >
          {semesters &&
            semesters.map((data) => (
              <Option value={data.id}>{data.name}</Option>
            ))}
        </Select>
      </Space>
      <Table
        columns={columns}
        dataSource={schedules}
        bordered={true}
        pagination={false}
        size="large"
        scroll={{ y: '75vh' }}
      />
    </div>
  );
};

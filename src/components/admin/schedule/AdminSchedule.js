import { Button, Col, Row, Select, Space, Typography } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import ScheduleApi from '../../../api/ScheduleApi';
import { CategorySelect } from './CategorySelect';
import { ClassSelect } from './ClassSelect';
import { DateSelect } from './DateSelect';
import { SessionSelect } from './SessionSelect';
import { TeacherSelect } from './TeacherSelect';
import ScheduleContext from './context/ScheduleContext';

const { Option } = Select;
const dateFormat = 'MM-DD-YYYY';

export const AdminSchedule = () => {
  const scheduleApi = new ScheduleApi();

  const [subjects, setSubjects] = useState([{ id: 0, name: 'Chọn' }]);
  const [subject, setSubject] = useState(subjects[0]);

  let startDate = moment(new Date()).format(dateFormat);
  let endDate = moment(new Date()).format(dateFormat);

  const handleGetSubjects = async () => {
    const getSubjects = await scheduleApi.getSubjects();
    setSubjects(getSubjects.data);
  };

  const handleChangeSubject = (value) => {
    const subject = subjects.find((sub) => sub.id === value);
    setSubject({ id: value, name: subject.name });
  };

  useEffect(() => {
    handleGetSubjects();
  }, []);

  return (
    <ScheduleContext.Provider value={subject}>
      <Row
        style={{
          height: '100%',
          width: '100%',
          padding: 20,
          background: '#fff',
          borderRadius: 10,
        }}
      >
        <Col span={12} style={{ padding: 20 }}>
          <Typography style={{ fontSize: '1.5rem' }}>
            Thêm Thời Khóa Biểu
          </Typography>
          <Space
            direction="vertical"
            style={{
              border: '1px solid #f0f0f0',
              padding: 30,
              boxSizing: 'border-box',
              borderRadius: 5,
              width: '100%',
              height: 400,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Space style={{ marginBottom: 20 }}>
              <Typography style={{ width: 80 }}>Môn học:</Typography>
              <Select
                defaultValue={subject.id}
                style={{
                  width: 450,
                  borderRadius: 10,
                }}
                size="large"
                onChange={(value) => {
                  handleChangeSubject(value);
                }}
              >
                {subjects?.map((subject) => {
                  return <Option value={subject.id}>{subject.name}</Option>;
                })}
              </Select>
            </Space>
            <Space style={{ marginBottom: 20 }} size="large">
              <DateSelect title={'Bắt đầu'} startDate={startDate} />
              <DateSelect title={'Kết thúc'} />
            </Space>
            <CategorySelect subjectId={subject.id} />
            <Space style={{ marginBottom: 20 }} size="large">
              <DateSelect title={'Ngày học'} />
              <SessionSelect />
            </Space>
            <Space size="large" style={{ marginBottom: 20 }}>
              <ClassSelect />
              <TeacherSelect />
            </Space>
          </Space>
          <Button
            type="primary"
            style={{
              float: 'right',
              width: 176,
              borderRadius: 10,
              marginTop: 10,
            }}
            size="large"
          >
            Thêm
          </Button>
        </Col>
        <Col span={12} style={{ padding: 20 }}>
          <Typography style={{ fontSize: '1.5rem' }}>Xem Trước</Typography>
          <Space
            style={{
              border: '1px solid #f0f0f0',
              width: '100%',
              padding: 30,
              height: 400,
            }}
            direction="vertical"
          >
            <Typography style={{ fontWeight: 'bold', textAlign: 'center' }}>
              LỊCH GIẢNG DẠY - HỌC TẬP
            </Typography>
            <Typography style={{ textAlign: 'center' }}>
              (Thời gian từ {startDate} đến {endDate})
            </Typography>
            <Typography style={{ fontWeight: 'bold' }}>
              Môn học: {subject.name}
            </Typography>
            <Space size="large" style={{ fontWeight: 'bold' }}>
              <Typography>Lớp: K70.A07</Typography>
              <Typography>Địa điểm: Phòng 310A-A14</Typography>
            </Space>
            <Space size="large">
              <table style={{ borderCollapse: 'collapse' }}>
                <tr>
                  <th
                    style={{ border: '1px solid black', textAlign: 'center' }}
                  >
                    Thứ.Ngày
                  </th>
                  <th
                    style={{ border: '1px solid black', textAlign: 'center' }}
                  >
                    Buổi
                  </th>
                  <th
                    style={{ border: '1px solid black', textAlign: 'center' }}
                  >
                    <Space direction="vertical">
                      <Typography>Nội dung giảng dạy - học tập</Typography>
                      <Typography>(Tên bài giảng/ chuyên đề)</Typography>
                    </Space>
                  </th>
                  <th
                    style={{ border: '1px solid black', textAlign: 'center' }}
                  >
                    Số tiết
                  </th>
                  <th
                    style={{ border: '1px solid black', textAlign: 'center' }}
                  >
                    <Space direction="vertical">
                      <Typography>Giảng viên</Typography>
                      <Typography>(điện thoại)</Typography>
                    </Space>
                  </th>
                </tr>
                <tr>
                  <td
                    style={{ border: '1px solid black', textAlign: 'center' }}
                  >
                    {`${moment(new Date()).locale('vi').format('dddd')}`}
                  </td>
                  <td
                    style={{ border: '1px solid black', textAlign: 'center' }}
                  >
                    Sáng
                  </td>
                  <td
                    style={{ border: '1px solid black', textAlign: 'center' }}
                  >
                    Khái quát xã hội học trong lãnh đạo quản lý
                  </td>
                  <td
                    style={{ border: '1px solid black', textAlign: 'center' }}
                  >
                    5
                  </td>
                  <td
                    style={{ border: '1px solid black', textAlign: 'center' }}
                  >
                    TS.Nguyễn Văn Đáng (0352.375.471)
                  </td>
                </tr>
              </table>
            </Space>
          </Space>
        </Col>
      </Row>
    </ScheduleContext.Provider>
  );
};

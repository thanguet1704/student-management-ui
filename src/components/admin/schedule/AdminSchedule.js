import { Button, Col, Row, Select, Space, Typography, Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../api/config';
import { CategorySelect } from './components/CategorySelect';
import { ClassSelect } from './components/ClassSelect';
import { DateSelect } from '../report/components/DateSelect';
import { SessionSelect } from './components/SessionSelect';
import { TeacherSelect } from './components/TeacherSelect';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';
const columns = [
  {
    title: 'Thứ.Ngày',
    dataIndex: 'learnDate',
    key: 'learnDate',
    render: (date) => {
      return `${moment(new Date()).locale('vi').format('dddd')}.${date}`;
    },
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
];

const AdminSchedule = () => {
  const [subjects, setSubjects] = useState([{ id: 0, name: 'Chọn' }]);
  const [subject, setSubject] = useState(subjects[0]);
  const [category, setCategory] = useState({ id: '', title: '' });
  const [startDate, setStartDate] = useState(
    `${moment(new Date()).format(dateFormat)}`
  );
  const [endDate, setEndDate] = useState(
    `${moment(new Date()).format(dateFormat)}`
  );
  const [learnDate, setLearnDate] = useState(
    `${moment(new Date()).format(dateFormat)}`
  );
  const [session, setSession] = useState({ id: 1, title: 'Sáng' });
  const [classObject, setClassObject] = useState({ id: 1, name: 'K70 - A01' });
  const [teacher, setTeacher] = useState({ id: 51, name: 'Trịnh Hữu Thắng' });
  const [errorCreate, setErrorCreate] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  let data = [
    {
      learnDate,
      category: category.title,
      session: session.title,
      lession: category.lession,
      teacher: `${teacher.name} (${teacher.phone})`,
    },
  ];

  const handleGetSubjects = async () => {
    const getSubjects = await axiosClient.get('/subjects');
    setSubjects(getSubjects.data);
  };

  const handleChangeSubject = (value) => {
    const subject = subjects.find((sub) => sub.id === value);
    setSubject({ id: value, name: subject.name });
  };

  const handleCreateSchedle = () => {
    axiosClient
      .post('/schedule', {
        subjectId: subject.id,
        categoryId: category.id,
        classId: classObject.id,
        learningDate: learnDate,
        sessionId: session.id,
        accountId: teacher.id,
        classroomId: 1,
        startDate,
        endDate,
        finalExamDate: '2021-05-02T11:59:24.248Z',
      })
      .then((res) => {
        setCreateSuccess(true);
      })
      .catch((err) => setErrorCreate(true));
  };

  useEffect(() => {
    handleGetSubjects();
  }, [subjects]);

  return (
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
            <DateSelect title={'Bắt đầu'} setDate={setStartDate} />
            <DateSelect title={'Kết thúc'} setDate={setEndDate} />
          </Space>
          <CategorySelect
            subjectId={subject.id}
            category={category}
            setCategory={setCategory}
          />
          <Space style={{ marginBottom: 20 }} size="large">
            <DateSelect title={'Ngày học'} setDate={setLearnDate} />
            <SessionSelect session={session} setSession={setSession} />
          </Space>
          <Space size="large" style={{ marginBottom: 20 }}>
            <ClassSelect
              classObject={classObject}
              setClassObject={setClassObject}
            />
            <TeacherSelect teacher={teacher} setTeacher={setTeacher} />
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
          onClick={handleCreateSchedle}
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
            <Typography>Lớp: {classObject.name}</Typography>
            <Typography>Địa điểm: Phòng 310A-A14</Typography>
          </Space>
          <Space size="large">
            <Table
              columns={columns}
              dataSource={data}
              bordered={true}
              pagination={false}
              size="large"
            />
          </Space>
        </Space>
      </Col>
    </Row>
  );
};

export default AdminSchedule;

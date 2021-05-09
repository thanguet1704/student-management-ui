import {
  Col,
  Row,
  Select,
  Space,
  Typography,
  Table,
  message,
  Button,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../api/config';
import { DateSelect } from './components/DateSelect';
import { CategorySelect } from './components/CategorySelect';
import { SessionSelect } from './components/SessionSelect';

const { Option } = Select;
const dateFormat = 'YYYY-DD-MM';
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

const AdminSchedule = () => {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState();
  const [category, setCategory] = useState();
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
  const [classObject, setClassObject] = useState();
  const [teacher, setTeacher] = useState({ id: 51, name: 'Trịnh Hữu Thắng' });

  const [teachers, setTeachers] = useState([
    { id: 51, name: 'Trịnh Hữu Thắng' },
  ]);

  const [semesters, setSemesters] = useState([]);
  const [semester, setSemester] = useState();

  const [classroom, setClassroom] = useState();
  const [classrooms, setClassrooms] = useState([]);

  const handleGetSemesters = () => {
    axiosClient.get('/semesters').then((res) => setSemesters(res.data));
  };

  const handleChangeSemester = (value) => {
    const s = semesters?.find((item) => item.id === value);
    setSemester(s);
  };

  const handleGetClassrooms = () => {
    axiosClient.get('/classrooms').then((res) => {
      setClassrooms(res.data);
      setClassroom(res.data[0]);
    });
  };

  const [classes, setClasses] = useState([]);

  const handleGetClass = async () => {
    const res = await axiosClient.get('/class');
    setClasses(res.data);
  };

  const handleChangeClass = async (value) => {
    const cla = classes.find((classs) => classs.id === value);
    setClassObject(cla);
  };

  const handleGetTeachers = async () => {
    const res = await axiosClient.get('/users/teachers');
    setTeachers(res.data);
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
        classroomId: classroom.id,
        startDate: startDate,
        endDate: endDate,
        finalExamDate: '2021-05-09T09:55:59.003Z',
      })
      .then((res) => {
        message.success('Thêm thời khóa biểu thành công');
      })
      .catch((err) => message.error(err.response.message));
  };

  const handleChangeSubject = (value) => {
    const subject = subjects.find((sub) => sub.id === value);
    setSubject({ id: value, name: subject.name });
  };

  const handleGetSubjects = async () => {
    const getSubjects = await axiosClient.get('/subjects');
    setSubjects(getSubjects.data);
  };

  const handleChangeClassroom = (value) => {
    const clroom = classrooms?.find((item) => item.id === value);
    setClassroom(clroom);
    console.log(classroom);
  };

  const handleChangeTeacher = (value) => {
    const ses = teachers.find((teacher) => teacher.id === value);
    setTeacher(ses);
  };

  // get schedule in right
  const [schedules, setSchedules] = useState([]);

  const newSchedule = [
    {
      id: 0,
      learnDate: learnDate,
      category: category?.title,
      session: session.title,
      lession: category?.lession,
      teacher: `${teacher.name} (${teacher.phone})`,
      subject: subject?.name,
      classroom: classroom?.name,
    },
  ];

  const handleGetSchedule = () => {
    axiosClient
      .get(`/schedule?semesterId=${semester?.id}&classId=${classObject?.id}`)
      .then((res) => {
        const data = res.data.map((item) => ({
          id: item.id,
          learnDate: item.date,
          category: item.category,
          session: session.title,
          lession: category.lession,
          teacher: `${teacher.name} (${teacher.phone})`,
          subject: subject.name,
          classroom: classroom,
        }));

        setSchedules(data);
      });
  };

  useEffect(() => {
    handleGetSchedule();
    handleGetSemesters();
    handleGetClassrooms();
    handleGetClass();
    handleGetTeachers();
    handleGetSubjects();
  }, [semester, classObject, subject, category]);

  return (
    <div>
      <div style={{ marginTop: 20, marginBottom: 20, borderRadius: 10 }}>
        <Space size="large">
          <Space>
            <Typography>Chọn Học kỳ:</Typography>
            <Select
              defaultValue={semester && semester.id && ''}
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
          <Space>
            <Typography>Chọn Lớp:</Typography>
            <Select
              defaultValue={classObject?.id}
              size="large"
              style={{ width: '7vw' }}
              onChange={(value) => handleChangeClass(value)}
            >
              {classes.length > 0 &&
                classes.map((classs) => {
                  return <Option value={classs.id}>{classs.name}</Option>;
                })}
            </Select>
          </Space>
        </Space>
      </div>
      {semester && classObject && (
        <Row>
          <Col span={8} style={{ padding: 20, backgroundColor: '#fff' }}>
            <Space
              direction="vertical"
              style={{
                border: '1px solid #f0f0f0',
                padding: 30,
                boxSizing: 'border-box',
                borderRadius: 5,
              }}
            >
              <Space style={{ marginBottom: 20, display: 'flex' }}>
                <Typography style={{ width: '4vw' }}>Môn học:</Typography>
                <Select
                  defaultValue={subject?.name}
                  size="large"
                  style={{ width: '19.7vw' }}
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
              {subject && (
                <CategorySelect
                  subjectId={subject?.id}
                  category={category}
                  setCategory={setCategory}
                />
              )}

              <Space style={{ marginBottom: 20 }} size="large">
                <DateSelect title={'Ngày học'} setDate={setLearnDate} />
                <SessionSelect session={session} setSession={setSession} />
              </Space>
              <Space size="large" style={{ marginBottom: 20 }}>
                <Typography style={{ width: '3.1vw' }}>Giảng viên:</Typography>
                <Select
                  defaultValue={teachers[0]?.id}
                  style={{ width: '19.7vw' }}
                  size="large"
                  value={teacher?.id}
                  onChange={(value) => handleChangeTeacher(value)}
                >
                  {teacher.length > 0 &&
                    teachers.map((s) => {
                      return <Option value={s.id}>{s.name}</Option>;
                    })}
                </Select>
              </Space>
              <Space size="large">
                <Space>
                  <Typography style={{ width: '4vw' }}>Phòng học:</Typography>
                  <Select
                    defaultValue={classroom?.id}
                    size="large"
                    value={classroom?.id}
                    style={{ width: '7vw' }}
                    onChange={(value) => handleChangeClassroom(value)}
                  >
                    {classrooms.length > 0 &&
                      classrooms.map((cl) => {
                        return <Option value={cl.id}>{cl.name}</Option>;
                      })}
                  </Select>
                </Space>

                <DateSelect title={'Kiếm tra'} setDate={setStartDate} />
              </Space>
            </Space>
            <Button
              type="primary"
              style={{
                float: 'right',
                borderRadius: 10,
                marginTop: 10,
                width: '5vw',
                backgroundColor: 'rgb(76, 124, 253)',
              }}
              size="large"
              onClick={handleCreateSchedle}
            >
              Tạo
            </Button>
          </Col>
          <Col span={16} style={{ padding: 20, backgroundColor: '#fff' }}>
            <Space
              style={{
                border: '1px solid #f0f0f0',
                width: '100%',
                padding: 30,
                display: 'flex',
                justifyContent: 'center',
              }}
              direction="vertical"
            >
              <Typography style={{ fontWeight: 'bold', textAlign: 'center' }}>
                THÊM MỚI THỜI KHÓA BIỂU
              </Typography>
              <Space
                size="large"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Table
                  columns={columns}
                  dataSource={newSchedule}
                  bordered={true}
                  pagination={false}
                  size="large"
                />
              </Space>
            </Space>
            <Space
              style={{
                border: '1px solid #f0f0f0',
                width: '100%',
                padding: 30,
              }}
              direction="vertical"
            >
              <Typography style={{ fontWeight: 'bold', textAlign: 'center' }}>
                LỊCH GIẢNG DẠY - HỌC TẬP (Lớp: {classObject?.name})
              </Typography>
              <Space
                size="large"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Table
                  columns={columns}
                  dataSource={schedules}
                  bordered={true}
                  pagination={false}
                  size="large"
                />
              </Space>
            </Space>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AdminSchedule;

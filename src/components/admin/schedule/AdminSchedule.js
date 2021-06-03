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
import { useContext, useEffect, useState } from 'react';
import { axiosClient } from '../../../api/config';
import { DateSelect } from '../report/components/DateSelect';
import { CategorySelect } from './components/CategorySelect';
import { SessionSelect } from './components/SessionSelect';
import { DateFormat } from '../../../common/interface';
import TableScheduleAdmin from './components/TableScheduleAdmin';
import { AuthContext } from '../../../contexts/AuthProvider';
import { DateFilter } from '../../../common/components/DateFilter';

const disableColor = '#d6d6d4';
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
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Thứ.Ngày
      </Typography>
    ),
    dataIndex: 'learnDate',
    key: 'learnDate',
    render: (date, row) => {
      const condition = moment(new Date(date)) < moment(new Date());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      const day = mappingDay.find(
        (d) => d.value === moment(new Date(date)).locale('vi').format('dddd')
      );

      return (
        <div>
          <Typography style={style}>{day.display}</Typography>
          <Typography style={style}>
            {moment(new Date(date)).format('DD-MM-YYYY')}
          </Typography>
        </div>
      );
    },
    align: 'center',
    width: '7vw',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Môn học
      </Typography>
    ),
    dataIndex: 'subject',
    key: 'subject',
    render: (value, row) => {
      const condition = moment(new Date(row.learnDate)) < moment(new Date());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      return <Typography style={style}>{value}</Typography>;
    },
    align: 'center',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Chuyên đề
      </Typography>
    ),
    dataIndex: 'category',
    key: 'category',
    render: (value, row) => {
      const condition = moment(new Date(row.learnDate)) < moment(new Date());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      return <Typography style={style}>{value}</Typography>;
    },
    align: 'center',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Buổi
      </Typography>
    ),
    dataIndex: 'session',
    key: 'session',
    render: (value, row) => {
      const condition = moment(new Date(row.learnDate)) < moment(new Date());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      return <Typography style={style}>{value}</Typography>;
    },
    align: 'center',
    width: '5vw',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Số tiết
      </Typography>
    ),
    dataIndex: 'lession',
    key: 'lession',
    render: (value, row) => {
      const condition = moment(new Date(row.learnDate)) < moment(new Date());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      return <Typography style={style}>{value}</Typography>;
    },
    align: 'center',
    width: '5vw',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Giảng viên (điện thoại)
      </Typography>
    ),
    dataIndex: 'teacher',
    key: 'teacher',
    render: (value, row) => {
      const condition = moment(new Date(row.learnDate)) < moment(new Date());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      return <Typography style={style}>{value}</Typography>;
    },
    align: 'center',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Địa điểm
      </Typography>
    ),
    dataIndex: 'classroom',
    key: 'classroom',
    render: (value, row) => {
      const condition = moment(new Date(row.learnDate)) < moment(new Date());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      return <Typography style={style}>{value}</Typography>;
    },
    align: 'center',
    width: '7vw',
  },
];
const dateOptions = [
  { key: 0, value: 'Tất cả' },
  { key: 7, value: '7 Ngày sau' },
  { key: 14, value: '14 Ngày sau' },
  { key: 30, value: '30 Ngày sau' },
  { key: 1, value: 'Tùy chọn' },
];

const AdminSchedule = () => {
  const { auth } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState();
  const [category, setCategory] = useState();
  const [startDate, setStartDate] = useState(
    `${moment(new Date()).format(DateFormat)}`
  );
  const [endDate, setEndDate] = useState(
    `${moment(new Date()).format(DateFormat)}`
  );
  const [learnDate, setLearnDate] = useState(
    `${moment(new Date()).format(DateFormat)}`
  );
  const [finalExamDate, setFinalExamDate] = useState(
    `${moment(new Date()).format(DateFormat)}`
  );
  const [session, setSession] = useState();
  const [classObject, setClassObject] = useState();
  const [teacher, setTeacher] = useState();

  const [teachers, setTeachers] = useState([]);

  const [semesters, setSemesters] = useState([]);
  const [semester, setSemester] = useState();

  const [classroom, setClassroom] = useState();
  const [classrooms, setClassrooms] = useState([]);
  const [span, setSpan] = useState(16);

  const [dateOption, setDateOption] = useState(dateOptions[0]);
  const [startDateFilter, setStartDateFilter] = useState(
    moment(moment(new Date()).format('YYYY-MM-DD')).toISOString()
  );
  const [endDateFilter, setEndDateFilter] = useState(
    moment(moment(new Date()).format('YYYY-MM-DD')).toISOString()
  );

  const handleGetSemesters = () => {
    axiosClient.get('/semesters').then((res) => {
      setSemesters(res.data);
      setSemester(res.data[0]);
    });
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

  const handleGetClass = () => {
    axiosClient.get('/class').then((res) => {
      setClasses(res.data);
      setClassObject(res.data[0]);
    });
  };

  const handleChangeClass = async (value) => {
    const cla = classes.find((classs) => classs.id === value);
    setClassObject(cla);
  };

  const handleGetTeachers = () => {
    axiosClient.get('/users/teachers').then((res) => {
      setTeachers(res.data.data);
      setTeacher(res.data.data[0]);
    });
  };

  const handleCreateSchedle = () => {
    axiosClient
      .post('/schedule', {
        subjectId: subject?.id,
        categoryId: category?.id,
        classId: classObject?.id,
        learningDate: learnDate,
        sessionId: session?.id,
        accountId: teacher?.id,
        classroomId: classroom?.id,
        startDate: startDate,
        endDate: endDate,
        finalExamDate: finalExamDate,
        semesterId: semester?.id,
      })
      .then((res) => {
        message.success('Thêm thời khóa biểu thành công');
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const handleChangeSubject = (value) => {
    const subject = subjects.find((sub) => sub.id === value);
    setSubject({ id: value, name: subject.name });
  };

  const handleGetSubjects = () => {
    axiosClient.get('/subjects').then((res) => {
      setSubjects(res.data);
      setSubject(res.data[0]);
    });
  };

  const handleChangeClassroom = (value) => {
    const clroom = classrooms?.find((item) => item.id === value);
    setClassroom(clroom);
  };

  const handleChangeTeacher = (value) => {
    const ses = teachers.find((teacher) => teacher.id === value);
    setTeacher(ses);
  };

  const newSchedule = [
    {
      id: 0,
      learnDate: learnDate,
      category: category?.title,
      session: session?.title,
      lession: category?.lession,
      teacher: `${teacher?.name} (${teacher?.phone})`,
      subject: subject?.name,
      classroom: classroom?.name,
    },
  ];

  const handleChangeDate = (value) => {
    const date = dateOptions.find((option) => option.key === value);
    setDateOption(date);
  };

  useEffect(() => {
    if (auth.role === 'admin') {
      setSpan(16);
    } else {
      setSpan(24);
    }
    handleGetSemesters();
    handleGetClassrooms();
    handleGetClass();
    handleGetTeachers();
    handleGetSubjects();
  }, []);

  return (
    <div>
      <div style={{ marginTop: 20, marginBottom: 20, borderRadius: 10 }}>
        <Space size="large">
          <Space>
            <Typography>Chọn Học kỳ:</Typography>
            <Select
              defaultValue={semester?.id}
              value={semester?.id}
              size="large"
              onChange={(value) => handleChangeSemester(value)}
              style={{ minWidth: '15vw' }}
              dropdownStyle={{
                border: '1px solid #fff',
              }}
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
              value={classObject?.id}
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
          {auth.role === 'teacher' ? (
            <Space>
              <Typography>Ngày:</Typography>
              <Select
                defaultValue={dateOption.key}
                value={dateOption.key}
                size="large"
                style={{ width: '7vw' }}
                onChange={(value) => handleChangeDate(value)}
              >
                {dateOptions.map((option) => {
                  return <Option value={option.key}>{option.value}</Option>;
                })}
              </Select>
            </Space>
          ) : (
            <></>
          )}
          {auth.role === 'teacher' && dateOption.key === 1 ? (
            <Space>
              <DateFilter
                title={'Bắt đầu'}
                setDate={setStartDateFilter}
                dateOption={dateOption}
                setDateOption={setDateOption}
                dateOptions={dateOptions}
              />
              <DateFilter
                title={'Kết thúc'}
                setDate={setEndDateFilter}
                dateOption={dateOption}
                setDateOption={setDateOption}
                dateOptions={dateOptions}
              />
            </Space>
          ) : (
            <></>
          )}
        </Space>
      </div>
      {semester && classObject && (
        <Row>
          {auth.role === 'admin' ? (
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
                    value={subject?.name}
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
                  <Typography style={{ width: '3.1vw' }}>
                    Giảng viên:
                  </Typography>
                  <Select
                    defaultValue={teacher?.id}
                    value={teacher?.id}
                    style={{ width: '19.7vw' }}
                    size="large"
                    onChange={(value) => handleChangeTeacher(value)}
                  >
                    {teachers.length > 0 &&
                      teachers?.map((s) => {
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
                      style={{ width: '7vw' }}
                      onChange={(value) => handleChangeClassroom(value)}
                    >
                      {classrooms.length > 0 &&
                        classrooms.map((cl) => {
                          return <Option value={cl.id}>{cl.name}</Option>;
                        })}
                    </Select>
                  </Space>

                  <DateSelect title={'Kiếm tra'} setDate={setFinalExamDate} />
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
          ) : (
            <></>
          )}
          <Col span={span} style={{ padding: 20, backgroundColor: '#fff' }}>
            {auth.role === 'admin' ? (
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
            ) : (
              <></>
            )}
            <TableScheduleAdmin
              class={classObject}
              columns={columns}
              semester={semester}
              dateOption={dateOption}
              startDateFilter={startDateFilter}
              endDateFilter={endDateFilter}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AdminSchedule;

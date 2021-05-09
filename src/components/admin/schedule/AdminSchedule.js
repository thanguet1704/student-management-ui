import { Col, Row, Select, Space, Typography } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../api/config';
import AdminScheduleLeft from './components/AdminScheduleLeft/AdminScheduleLeft';
import AdminScheduleRight from './components/AdminScheduleRight/AdminScheduleRight';

const { Option } = Select;
const dateFormat = 'YYYY-DD-MM';

const AdminSchedule = () => {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState({ id: 0, name: 'Chọn môn học' });
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
    axiosClient.get('/classrooms').then((res) => setClassrooms(res.data));
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

  useEffect(() => {
    handleGetSemesters();
    handleGetClassrooms();
    handleGetClass();
    handleGetTeachers();
  }, [semester, classroom, classObject, teacher]);

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
            <AdminScheduleLeft
              subject={subject}
              subjects={subjects}
              category={category}
              classObject={classObject}
              learnDate={learnDate}
              startDate={startDate}
              endDate={endDate}
              finalExamDate={'2021-05-02T11:59:24.248Z'}
              classroomId={1}
              session={session}
              teacher={teacher}
              setSubject={setSubject}
              setLearnDate={setLearnDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setSession={setSession}
              setTeacher={setTeacher}
              teachers={teachers}
              setSubjects={setSubjects}
              setTeachers={setTeachers}
              setCategory={setCategory}
              classroom={classroom}
              setClassroom={setClassroom}
              classrooms={classrooms}
            />
          </Col>
          <Col span={16} style={{ padding: 20, backgroundColor: '#fff' }}>
            <AdminScheduleRight
              startDate={startDate}
              endDate={endDate}
              subject={subject}
              classObject={classObject}
              learnDate={learnDate}
              category={category}
              session={session}
              teacher={teacher}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AdminSchedule;

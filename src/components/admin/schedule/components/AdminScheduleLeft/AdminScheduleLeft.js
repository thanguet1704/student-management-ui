import { Button, Select, Space, Typography, message } from 'antd';
import { CategorySelect } from './components/CategorySelect';
import { DateSelect } from './components/DateSelect';
import { SessionSelect } from './components/SessionSelect';
import { TeacherSelect } from './components/TeacherSelect';
import { axiosClient } from '../../../../../api';
import { useEffect } from 'react';

const { Option } = Select;

const AdminScheduleLeft = (props) => {
  const handleCreateSchedle = () => {
    axiosClient
      .post('/schedule', {
        subjectId: props.subject.id,
        categoryId: props.category.id,
        classId: props.classObject.id,
        learningDate: props.learnDate,
        sessionId: props.session.id,
        accountId: props.teacher.id,
        classroomId: props.classroomId,
        startDate: props.startDate,
        endDate: props.endDate,
        finalExamDate: props.finalExamDate,
      })
      .then((res) => {
        message.success('Thêm thời khóa biểu thành công');
      })
      .catch((err) => message.error(err.response.message));
  };

  const handleChangeSubject = (value) => {
    const subject = props.subjects.find((sub) => sub.id === value);
    props.setSubject({ id: value, name: subject.name });
  };

  const handleGetSubjects = async () => {
    const getSubjects = await axiosClient.get('/subjects');
    props.setSubjects(getSubjects.data);
  };

  const handleChangeClassroom = (value) => {
    props.setClassroom(value);
  };

  const handleChangeTeacher = (value) => {
    const ses = props.teachers.find((teacher) => teacher.id === value);
    props.setTeacher(ses);
  };

  useEffect(() => {
    handleGetSubjects();
  }, [props.subject]);

  return (
    <div>
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
            defaultValue={props.subject && props.subject.name}
            size="large"
            style={{ width: '19.7vw' }}
            onChange={(value) => {
              handleChangeSubject(value);
            }}
          >
            {props.subjects?.map((subject) => {
              return <Option value={subject.id}>{subject.name}</Option>;
            })}
          </Select>
        </Space>
        <Space style={{ marginBottom: 20 }} size="large">
          <DateSelect title={'Bắt đầu'} setDate={props.setStartDate} />
          <DateSelect title={'Kết thúc'} setDate={props.setEndDate} />
        </Space>
        {props.subject.id !== 0 && (
          <CategorySelect
            subjectId={props.subject.id}
            category={props.category}
            setCategory={props.setCategory}
          />
        )}
        <Space style={{ marginBottom: 20 }} size="large">
          <DateSelect title={'Ngày học'} setDate={props.setLearnDate} />
          <SessionSelect
            session={props.session}
            setSession={props.setSession}
          />
        </Space>
        <Space size="large" style={{ marginBottom: 20 }}>
          <Typography style={{ width: '3.1vw' }}>Giảng viên:</Typography>
          <Select
            defaultValue={props.teacher?.id}
            style={{ width: '19.7vw' }}
            size="large"
            value={props.teacher.id}
            onChange={(value) => handleChangeTeacher(value)}
          >
            {props.teacher.length > 0 &&
              props.teachers.map((s) => {
                return <Option value={s.id}>{s.name}</Option>;
              })}
          </Select>
        </Space>
        <Space size="large">
          <Space>
            <Typography style={{ width: '4vw' }}>Phòng học:</Typography>
            <Select
              defaultValue={props.teacher?.id}
              size="large"
              value={props.teacher.id}
              style={{ width: '7vw' }}
              onChange={(value) => handleChangeClassroom(value)}
            >
              {props.teacher.length > 0 &&
                props.teachers.map((s) => {
                  return <Option value={s.id}>{s.name}</Option>;
                })}
            </Select>
          </Space>

          <DateSelect title={'Kiếm tra'} setDate={props.setStartDate} />
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
    </div>
  );
};

export default AdminScheduleLeft;

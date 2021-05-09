import { Select, Space, Typography } from 'antd';

const { Option } = Select;

export const TeacherSelect = (props) => {
  const handleChangeTeacher = (value) => {
    const ses = props.teachers.find((teacher) => teacher.id === value);
    props.setTeacher(ses);
  };

  return (
    <Space>
      <Typography style={{ width: '4vw' }}>Giảng viên:</Typography>
      <Select
        defaultValue={props.teacher?.id}
        style={{ width: '100%' }}
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
  );
};

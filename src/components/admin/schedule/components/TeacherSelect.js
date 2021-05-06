import { Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api/config';

const { Option } = Select;

export const TeacherSelect = (props) => {
  const [teachers, setTeachers] = useState([
    { id: 51, name: 'Trịnh Hữu Thắng' },
  ]);

  const handleGetTeachers = async () => {
    const res = await axiosClient.get('/users/teachers');
    setTeachers(res.data);
  };

  const handleChangeTeacher = (value) => {
    const ses = teachers.find((teacher) => teacher.id === value);
    props.setTeacher(ses);
  };

  useEffect(() => {
    handleGetTeachers();
  }, []);
  return (
    <Space>
      <Typography>Giảng viên:</Typography>
      <Select
        defaultValue={props.teacher.id}
        style={{ width: 206 }}
        size="large"
        value={props.teacher.id}
        onChange={(value) => handleChangeTeacher(value)}
      >
        {teachers?.map((s) => {
          return <Option value={s.id}>{s.name}</Option>;
        })}
      </Select>
    </Space>
  );
};

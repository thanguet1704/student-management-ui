import { Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api/config';

const { Option } = Select;

export const TeacherSelect = (props) => {
  const handleChangeTeacher = (value) => {
    const ses = props.teachers.find((teacher) => teacher.id === value);
    props.setTeacher(ses);
  };

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
        {/* {props.teachers?.map((s) => {
          return <Option value={s.id}>{s.name}</Option>;
        })} */}
      </Select>
    </Space>
  );
};

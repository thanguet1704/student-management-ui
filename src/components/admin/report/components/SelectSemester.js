import { useEffect, useState } from 'react';
import { Space, Typography, Select } from 'antd';
import { axiosClient } from '../../../../api';

const { Option } = Select;

const SelectSemester = (props) => {
  const [semesters, setSemesters] = useState([]);

  const hanldeGetSemesters = () => {
    axiosClient.get('/semesters').then((res) => {
      setSemesters(res.data);
      props.setSemester(res.data[0]);
    });
  };

  const handleChangeSemester = (value) => {
    const newSemester = semesters.find((item) => item.id === value);
    props.setSemester(newSemester);
  };

  useEffect(() => {
    hanldeGetSemesters();
  }, []);
  return (
    <Space>
      <Typography>Chọn Học kỳ:</Typography>
      <Select
        // defaultValue={props.semester?.id}
        // value={props.semester?.id}
        style={{ width: '20vw' }}
        size="large"
        onChange={(value) => handleChangeSemester(value)}
      >
        {semesters.length > 0 &&
          semesters.map((data) => <Option value={data.id}>{data.name}</Option>)}
      </Select>
    </Space>
  );
};

export default SelectSemester;

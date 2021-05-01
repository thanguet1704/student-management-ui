import { Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../api';

const { Option } = Select;

export const ClassSelect = () => {
  const [classes, setClasses] = useState([{ id: 1, name: 'K70 - A01' }]);
  const [classObject, setClassObject] = useState(classes[0]);

  const handleGetClass = async () => {
    const res = await axiosClient.get('/class');
    setClasses(res.data);
  };

  const handleChangeClass = async (value) => {
    const cla = classes.find((classs) => classs.id === value);
    setClassObject(cla);
  };

  useEffect(() => {
    handleGetClass();
  }, []);

  return (
    <Space>
      <Typography style={{ width: 80 }}>Lớp:</Typography>
      <Select
        defaultValue={classObject.id}
        style={{ width: 140 }}
        size="large"
        onChange={(value) => handleChangeClass(value)}
      >
        {classes.map((classs) => {
          return <Option value={classs.id}>{classs.name}</Option>;
        })}
      </Select>
    </Space>
  );
};

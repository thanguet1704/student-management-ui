import { Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../api';

const { Option } = Select;

export const CategorySelect = (props) => {
  const [categories, setCategories] = useState([{ id: '', title: '' }]);
  const [category, setCategory] = useState(categories[0]);

  const handleGetCategories = async () => {
    const res = await axiosClient.get(`/subjects/${props.subjectId}`);
    setCategories(res.data);
  };

  const handleChangeCategory = (value) => {
    const ses = categories.find((category) => category.id === value);
    setCategory(ses);
  };

  useEffect(() => {
    handleGetCategories();
  }, [props.subjectId]);
  return (
    <Space style={{ marginBottom: 20 }}>
      <Typography style={{ width: 80 }}>Chuyên đề:</Typography>
      <Select
        defaultValue={category.id}
        style={{ width: 450 }}
        size="large"
        onChange={(value) => handleChangeCategory(value)}
      >
        {categories?.map((s) => {
          return <Option value={s.id}>{s.title}</Option>;
        })}
      </Select>
    </Space>
  );
};

import { Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';

const { Option } = Select;

export const CategorySelect = (props) => {
  const { subjectId, category, setCategory } = props;
  const [categories, setCategories] = useState();

  const handleGetCategories = async () => {
    const res = await axiosClient.get(`/subjects/${subjectId}`);
    setCategories(res.data);
    if (res.data.length) {
      setCategory(res.data[0]);
    } else {
      setCategory({ id: '', title: '' });
    }
  };

  const handleChangeCategory = (value) => {
    const ses = categories.find((category) => category.id === value);
    setCategory(ses);
  };

  useEffect(() => {
    handleGetCategories();
  }, [subjectId]);
  return (
    <Space style={{ marginBottom: 20 }}>
      <Typography style={{ width: 80 }}>Chuyên đề:</Typography>
      <Select
        defaultValue={category.id}
        value={category.id}
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
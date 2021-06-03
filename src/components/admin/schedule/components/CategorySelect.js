import { Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api/config';

const { Option } = Select;

export const CategorySelect = (props) => {
  const { subjectId, category, setCategory } = props;
  const [categories, setCategories] = useState([]);

  const handleGetCategories = () => {
    axiosClient.get(`/subjects/${subjectId}`).then((res) => {
      setCategories(res.data);
      setCategory(res.data[0]);
    });
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
      <Typography style={{ width: '4vw' }}>Chuyên đề:</Typography>
      <Select
        defaultValue={category?.id}
        value={category?.id}
        size="large"
        style={{ width: '19.7vw' }}
        onChange={(value) => handleChangeCategory(value)}
      >
        {categories?.map((s) => {
          return <Option value={s.id}>{s.title}</Option>;
        })}
      </Select>
    </Space>
  );
};

import { Checkbox, Col } from 'antd';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../api/config';

export const FilterButton = (props) => {
  const [checkList, setCheckList] = useState([]);
  const [list, setList] = useState([]);

  const handleOnChange = (checkedValues) => {
    setList(checkedValues);
  };

  const handleGetClass = async () => {
    const res = await axiosClient.get('/class');
    setCheckList(res.data);
  };

  useEffect(() => {
    handleGetClass();
  }, []);

  return (
    <Checkbox.Group onChange={handleOnChange}>
      {checkList.map((item) => {
        return (
          <Col span={8}>
            <Checkbox value={item.id}>{item.name}</Checkbox>
          </Col>
        );
      })}
    </Checkbox.Group>
  );
};

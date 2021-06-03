import { Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api/config';

const { Option } = Select;

export const SessionSelect = (props) => {
  const [sessions, setSessions] = useState([{ id: 1, title: 'Sáng' }]);

  const handleGetSession = async () => {
    const res = await axiosClient.get('/sessions');
    setSessions(res.data);
    props.setSession(res.data[0]);
  };

  const handleChangeSession = (value) => {
    const ses = sessions.find((session) => session.id === value);
    props.setSession(ses);
  };

  useEffect(() => {
    handleGetSession();
  }, []);
  return (
    <Space>
      <Typography>Buổi:</Typography>
      <Select
        defaultValue={props.session?.id}
        value={props.session?.id}
        style={{ width: '9.3vw' }}
        size="large"
        onChange={(value) => handleChangeSession(value)}
      >
        {sessions?.map((s) => {
          return <Option value={s.id}>{s.title}</Option>;
        })}
      </Select>
    </Space>
  );
};

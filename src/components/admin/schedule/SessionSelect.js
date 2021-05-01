import { Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../api';

const { Option } = Select;

export const SessionSelect = (props) => {
  const [sessions, setSessions] = useState([{ id: 1, title: 'Sáng' }]);
  const [session, setSession] = useState(sessions[0]);

  const handleGetSession = async () => {
    const res = await axiosClient.get('/sessions');
    setSessions(res.data);
  };

  const handleChangeSession = (value) => {
    const ses = sessions.find((session) => session.id === value);
    setSession(ses);
  };

  useEffect(() => {
    handleGetSession();
  }, []);
  return (
    <Space>
      <Typography>Buổi:</Typography>
      <Select
        defaultValue={session.id}
        style={{ width: '5vw' }}
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

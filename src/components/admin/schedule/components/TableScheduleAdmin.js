import { Space, Typography, Table } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';
import { AuthContext } from '../../../../contexts/AuthProvider';

const TableScheduleAdmin = (props) => {
  const [schedules, setSchedules] = useState([]);
  const { auth } = useContext(AuthContext);
  const [scroll, setScroll] = useState('35vh');

  const handleGetSchedule = () => {
    axiosClient
      .get(
        `/schedule?semesterId=${props.semester?.id}&classId=${props.class?.id}`
      )
      .then((res) => {
        const data = res.data.map((item) => ({
          id: item.id,
          learnDate: item.date,
          category: item.category,
          session: item.session.title,
          lession: item.lession,
          teacher: `${item.teacher.name} (${item.teacher.phone})`,
          subject: item.subject,
          classroom: item.classroom,
        }));

        setSchedules(data);
      });
  };

  useEffect(() => {
    if (auth.role === 'admin') {
      setScroll('35vh');
    } else {
      setScroll('60vh');
    }
    handleGetSchedule();
  }, [props.semester, props.class]);

  return (
    <Space
      style={{
        border: '1px solid #f0f0f0',
        width: '100%',
        padding: 30,
      }}
      direction="vertical"
    >
      <Typography style={{ fontWeight: 'bold', textAlign: 'center' }}>
        LỊCH GIẢNG DẠY - HỌC TẬP (Lớp: {props.class?.name})
      </Typography>
      <Space
        size="large"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Table
          rowKey={1}
          columns={props.columns}
          dataSource={schedules}
          bordered={true}
          pagination={false}
          size="large"
          scroll={{ y: scroll }}
        />
      </Space>
    </Space>
  );
};

export default TableScheduleAdmin;

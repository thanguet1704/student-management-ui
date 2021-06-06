import { Space, Typography, Table, Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';
import { AuthContext } from '../../../../contexts/AuthProvider';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const TableScheduleAdmin = (props) => {
  const [schedules, setSchedules] = useState([]);
  const { auth } = useContext(AuthContext);
  const [scroll, setScroll] = useState('35vh');
  const [isLoadingSchedule, setLoadingSchedule] = useState(false);

  const handleGetSchedule = () => {
    setLoadingSchedule(true);
    let startDate;
    let endDate;
    if (props.dateOption.key === 1) {
      startDate = moment(
        moment(new Date(props.startDateFilter))
          .subtract(1, 'day')
          .format('YYYY-MM-DD')
      )
        .subtract(1, 'day')
        .toISOString();
      endDate = moment(
        moment(new Date(props.endDateFilter)).add(1, 'day').format('YYYY-MM-DD')
      )
        .add(props.dateOption.key, 'day')
        .toISOString();
    } else if (props.dateOption.key !== 0) {
      startDate = moment(moment(new Date()).format('YYYY-MM-DD'))
        .subtract(1, 'day')
        .toISOString();
      endDate = moment(moment(new Date()).format('YYYY-MM-DD'))
        .add(props.dateOption.key + 1, 'day')
        .toISOString();
    }

    axiosClient
      .get(
        `/schedule?semesterId=${props.semester?.id}&classId=${
          props.class?.id
        }&startDate=${encodeURIComponent(
          startDate
        )}&endDate=${encodeURIComponent(endDate)}`
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
        setLoadingSchedule(false);
        setSchedules(data);
      })
      .catch((error) => {
        setLoadingSchedule(false);
      });
  };

  useEffect(() => {
    if (auth.role === 'admin') {
      setScroll('35vh');
    } else {
      setScroll('60vh');
    }
    handleGetSchedule();
  }, [
    props.semester,
    props.class,
    props.dateOption,
    props.startDateFilter,
    props.endDateFilter,
  ]);

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
        {isLoadingSchedule ? (
          <Spin indicator={antIcon} />
        ) : (
          <Table
            columns={props.columns}
            dataSource={schedules}
            bordered={true}
            pagination={false}
            size="large"
            scroll={{ y: scroll }}
          />
        )}
      </Space>
    </Space>
  );
};

export default TableScheduleAdmin;

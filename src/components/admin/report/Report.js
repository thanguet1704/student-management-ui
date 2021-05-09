import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import { createFromIconfontCN } from '@ant-design/icons';
import { Card, Col, Row, Space, Typography } from 'antd';
import 'date-fns';
import { useEffect, useState } from 'react';
import { Chart } from './components/Chart';
import { TableReport } from './components/TableReport';
import { TotalCard } from './components/TotalCard';
import { Selection } from '../../../common/components/Selection';
import { axiosClient } from '../../../api/config';
import { DateSelect } from './components/DateSelect';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const Report = () => {
  const [schoolYears, setSchoolYears] = useState([{ id: 1, name: 'K70' }]);
  const [schoolYear, setSchoolYear] = useState({ id: 1 });

  const [statAtendence, setStatAttendence] = useState();
  const [classIdChart, setClasdIdChart] = useState();
  const [startDateReport, setStartDateReport] = useState(
    new Date().toISOString()
  );
  const [endDateReport, setEndDateReport] = useState(new Date().toISOString());

  const [students, setStudents] = useState([]);

  const handleGetStatAttendence = () => {
    axiosClient
      .get(
        `/attendence/attendenceStats?schoolYearId=${schoolYear.id}&startDate=${startDateReport}&endDate=${endDateReport}`
      )
      .then((res) => setStatAttendence(res.data.stat));
  };

  const handleGetSchoolYears = () => {
    axiosClient.get('/schoolYears').then((res) => setSchoolYears(res.data));
  };

  const handleGetTopAbsent = () => {
    axiosClient
      .get(`attendence/topAbsent?schoolYearId=${schoolYear.id}`)
      .then((res) => setStudents(res.data))
      .catch((error) => {});
  };

  useEffect(() => {
    handleGetSchoolYears();
  }, []);

  useEffect(() => {
    handleGetStatAttendence();
    handleGetTopAbsent();
  }, [schoolYear, startDateReport, endDateReport, classIdChart]);
  return (
    <div>
      <Row
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: 20,
          marginBottom: 20,
        }}
      >
        <Space size="large">
          <Selection
            title={'Khóa'}
            schoolYear={schoolYear}
            setSchoolYear={setSchoolYear}
            schoolYears={schoolYears}
          />
          <Space size="large">
            <DateSelect title={'Từ ngày'} setDate={setStartDateReport} />
            <DateSelect title={'Đến ngày'} setDate={setEndDateReport} />
          </Space>
        </Space>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <TotalCard
          title={'Tổng lượt điểm danh'}
          stat={statAtendence?.total}
          icon={
            <PeopleAltOutlinedIcon style={{ fontSize: 50, color: '#5BC3B2' }} />
          }
        />
        <TotalCard
          title={'Tổng lượt có mặt'}
          stat={statAtendence?.attend}
          icon={
            <IconFont
              type="icon-tuichu"
              style={{ fontSize: 50, color: '#5BC3B2' }}
            />
          }
        />
        <TotalCard title={'Tổng lượt muộn'} stat={statAtendence?.late} />
        <TotalCard title={'Tổng lượt vắng'} stat={statAtendence?.absent} />
      </Row>
      <Row style={{ padding: 20 }} gutter={40}>
        <Col span={18}>
          <Card
            bodyStyle={{
              // background: '#BFFAD3',
              borderRadius: 10,
              border: '1px solid rgb(227, 235, 246)',
              boxShadow: 'rgb(18 38 63 / 3%) 0px 3px 3px 0px !important',
              height: '50vh',
            }}
          >
            <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Biểu đồ thống kê số lượt vắng học trong năm 2021
            </Typography>
            <Chart setClasdIdChart={setClasdIdChart} />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bodyStyle={{
              // background: '#BFFAD3',
              borderRadius: 10,
              border: '1px solid rgb(227, 235, 246)',
              boxShadow: 'rgb(18 38 63 / 3%) 0px 3px 3px 0px !important',
              height: '50vh',
            }}
          >
            <TableReport students={students} />
          </Card>
        </Col>
      </Row>
      {/* <Row
          style={{
            fontWeight: 'bold',
            fontSize: '1.5em',
            color: '#F7EB7F',
            padding: 20,
          }}
        >
          <Typography>GIÁM SÁT LỚP</Typography>
        </Row>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=iTRM_5v2GVQ"
            style={{ width: '100%' }}
          />
          <ReactPlayer
            url="https://www.youtube.com/watch?v=iTRM_5v2GVQ"
            style={{ width: '100%' }}
          />
        </Row> */}
    </div>
  );
};

export default Report;

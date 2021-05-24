import { Card, Col, Row, Space } from 'antd';
import 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { Chart } from './components/Chart';
import { TableReport } from './components/TableReport';
import { TotalCard } from './components/TotalCard';
import { Selection } from '../../../common/components/Selection';
import { axiosClient } from '../../../api/config';
import SelectSemester from './components/SelectSemester';
import { AuthContext } from '../../../contexts/AuthProvider';

const Report = () => {
  const { auth } = useContext(AuthContext);
  const [schoolYears, setSchoolYears] = useState([{ id: 1, name: 'K70' }]);
  const [schoolYear, setSchoolYear] = useState({ id: 1 });

  const [statAtendence, setStatAttendence] = useState();
  // const [classIdChart, setClassIdChart] = useState();

  const [students, setStudents] = useState([]);
  // const [showCamera, setShowCamera] = useState(false);
  const [charts, setCharts] = useState([]);
  const [semester, setSemester] = useState();

  const handleGetStatAttendence = () => {
    axiosClient
      .get(
        `/attendence/attendenceStats?semesterId=${semester?.id}&schoolYearId=${schoolYear.id}`
      )
      .then((res) => {
        setStatAttendence(res.data.stat);
        setCharts(res.data.charts);
      });
  };

  const handleGetSchoolYears = () => {
    axiosClient.get('/schoolYears').then((res) => setSchoolYears(res.data));
  };

  const handleGetTopAbsent = () => {
    axiosClient
      .get(
        `attendence/topAbsent?schoolYearId=${schoolYear.id}&semesterId=${semester?.id}`
      )
      .then((res) => setStudents(res.data))
      .catch((error) => {});
  };

  useEffect(() => {
    handleGetSchoolYears();
  }, [semester]);

  useEffect(() => {
    handleGetStatAttendence();
    handleGetTopAbsent();
  }, [schoolYear, semester]);
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
          <SelectSemester setSemester={setSemester} semester={semester} />
          {auth.role === 'admin' ? (
            <Selection
              title={'Khóa'}
              schoolYear={schoolYear}
              setSchoolYear={setSchoolYear}
              // showCamera={showCamera}
              schoolYears={schoolYears}
            />
          ) : (
            <></>
          )}
        </Space>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <TotalCard title={'Tổng lượt điểm danh'} stat={statAtendence?.total} />
        <TotalCard title={'Tổng lượt có mặt'} stat={statAtendence?.attend} />
        <TotalCard title={'Tổng lượt muộn'} stat={statAtendence?.late} />
        <TotalCard title={'Tổng lượt vắng'} stat={statAtendence?.absent} />
      </Row>
      <Row style={{ padding: 20 }} gutter={40}>
        <Col span={18}>
          <Card
            bodyStyle={{
              borderRadius: 10,
              border: '1px solid rgb(227, 235, 246)',
              boxShadow: 'rgb(18 38 63 / 3%) 0px 3px 3px 0px !important',
              height: '50vh',
            }}
          >
            <Chart
              // setClassIdChart={setClassIdChart}
              // setShowCamera={setShowCamera}
              charts={charts}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bodyStyle={{
              borderRadius: 10,
              border: '1px solid rgb(227, 235, 246)',
              boxShadow: 'rgb(18 38 63 / 3%) 0px 3px 3px 0px !important',
              height: '50vh',
            }}
            className="hightchart"
          >
            <TableReport students={students} />
          </Card>
        </Col>
      </Row>
      {/* {showCamera && (
        <div>
          <Row
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
          </Row>
        </div>
      )} */}
    </div>
  );
};

export default Report;

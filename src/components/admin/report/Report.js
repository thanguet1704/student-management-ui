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
  const [schoolYears, setSchoolYears] = useState([]);
  const [schoolYear, setSchoolYear] = useState();

  const [statAtendence, setStatAttendence] = useState();
  const [classIdChart, setClassIdChart] = useState();

  const [students, setStudents] = useState([]);
  const [charts, setCharts] = useState([]);
  const [semester, setSemester] = useState();

  const handleGetStatAttendence = () => {
    axiosClient
      .get(
        `/attendence/attendenceStats?semesterId=${semester?.id}&schoolYearId=${schoolYear?.id}`
      )
      .then((res) => {
        setStatAttendence(res.data.stat);
        setCharts(res.data.charts);
      });
  };

  const handleGetSchoolYears = () => {
    axiosClient.get('/schoolYears').then((res) => {
      setSchoolYears(res.data);
      setSchoolYear(res.data[0]);
    });
  };

  const handleGetTopAbsent = () => {
    axiosClient
      .get(
        `attendence/topAbsent?schoolYearId=${schoolYear?.id}&semesterId=${semester?.id}&classId=${classIdChart}`
      )
      .then((res) => setStudents(res.data))
      .catch((error) => {});
  };

  useEffect(() => {
    handleGetSchoolYears();
  }, []);

  useEffect(() => {
    handleGetStatAttendence();
    handleGetTopAbsent();
  }, [schoolYear, semester, classIdChart]);

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
              height: '60vh',
            }}
          >
            <Chart
              setClassIdChart={setClassIdChart}
              classIdChart={classIdChart}
              charts={charts}
              semester={semester}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bodyStyle={{
              borderRadius: 10,
              border: '1px solid rgb(227, 235, 246)',
              boxShadow: 'rgb(18 38 63 / 3%) 0px 3px 3px 0px !important',
              height: '60vh',
            }}
            className="hightchart"
          >
            <TableReport students={students} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Report;

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
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Report = () => {
  const { auth } = useContext(AuthContext);
  const [schoolYears, setSchoolYears] = useState([]);
  const [schoolYear, setSchoolYear] = useState();
  const [schoolYearId, setSchoolYearId] = useState();

  const [statAtendence, setStatAttendence] = useState();
  const [classIdChart, setClassIdChart] = useState();

  const [students, setStudents] = useState([]);
  const [charts, setCharts] = useState([]);
  const [semester, setSemester] = useState();
  const [isLoadingStat, setIsLoadingStat] = useState(true);
  const [isLoadingTopAbsent, setIsLoadingTopAbsent] = useState(false);

  const handleGetStatAttendence = () => {
    setIsLoadingStat(true);
    axiosClient
      .get(
        `/attendence/attendenceStats?semesterId=${semester?.id}&schoolYearId=${schoolYear?.id}`
      )
      .then((res) => {
        setIsLoadingStat(false);
        setStatAttendence(res.data.stat);
        setCharts(res.data.charts);
      })
      .catch((error) => setIsLoadingStat(false));
  };

  const handleGetSchoolYears = () => {
    axiosClient.get('/schoolYears').then((res) => {
      setSchoolYears(res.data);
      setSchoolYear(res.data[0]);
      setSchoolYearId(res.data[0].id);
    });
  };

  const handleGetTopAbsent = () => {
    setIsLoadingTopAbsent(true);
    axiosClient
      .get(
        `attendence/topAbsent?schoolYearId=${schoolYear?.id}&semesterId=${semester?.id}&classId=${classIdChart}`
      )
      .then((res) => {
        setIsLoadingTopAbsent(false);
        setStudents(res.data);
      })
      .catch((error) => {
        setIsLoadingTopAbsent(false);
      });
  };

  useEffect(() => {
    handleGetSchoolYears();
  }, []);

  useEffect(() => {
    handleGetStatAttendence();
  }, [schoolYear, semester]);

  useEffect(() => {
    handleGetTopAbsent();
  }, [classIdChart, schoolYearId, schoolYear]);

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
      {isLoadingStat ? (
        <Spin indicator={antIcon} style={{ width: '100%' }} />
      ) : (
        <div>
          <Row style={{ marginBottom: 20 }}>
            <TotalCard
              title={'Tổng lượt điểm danh'}
              stat={statAtendence?.total}
            />
            <TotalCard
              title={'Tổng lượt có mặt'}
              stat={statAtendence?.attend}
            />
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
                  schoolYears={schoolYears}
                  setSchoolYearId={setSchoolYearId}
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
                <TableReport
                  students={students}
                  isLoadingTopAbsent={isLoadingTopAbsent}
                  setIsLoadingTopAbsent={setIsLoadingTopAbsent}
                />
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Report;

import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import { createFromIconfontCN } from '@ant-design/icons';
import { Card, Col, Row, Space, Typography, Select } from 'antd';
import 'date-fns';
import { useEffect, useState } from 'react';
import { Chart } from './components/Chart';
import { TableReport } from './components/TableReport';
import { TotalCard } from './components/TotalCard';
import { Selection } from '../../../common/components/Selection';
import { axiosClient } from '../../../api/config';
import ReactPlayer from 'react-player';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const { Option } = Select;

const Report = () => {
  const [schoolYears, setSchoolYears] = useState([{ id: 1, name: 'K70' }]);
  const [schoolYear, setSchoolYear] = useState({ id: 1 });

  const [statAtendence, setStatAttendence] = useState();
  const [classIdChart, setClassIdChart] = useState();

  const [students, setStudents] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [charts, setCharts] = useState([]);
  const [semester, setSemester] = useState();
  const [semesters, setSemesters] = useState([]);

  const hanldeGetSemesters = () => {
    axiosClient.get('/semesters').then((res) => {
      setSemesters(res.data);
      setSemester(res.data[0]);
    });
  };

  const handleChangeSemester = (value) => {
    const newSemester = semesters.find((item) => item.id === value);
    setSemester(newSemester);
  };

  const handleGetStatAttendence = () => {
    if (semester && schoolYear) {
      axiosClient
        .get(
          `/attendence/attendenceStats?semester=${semester?.id}&schoolYearId=${schoolYear.id}`
        )
        .then((res) => {
          setStatAttendence(res.data.stat);
          setCharts(res.data.charts);
        });
    }
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
    hanldeGetSemesters();
    handleGetSchoolYears();
  }, []);

  useEffect(() => {
    handleGetStatAttendence();
    handleGetTopAbsent();
  }, [schoolYear, classIdChart, semester]);
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
          <Space>
            <Typography>Chọn Học kỳ:</Typography>
            <Select
              defaultValue={semester && semester.id}
              value={semester?.id}
              style={{ width: '20vw' }}
              size="large"
              onChange={handleChangeSemester}
            >
              {semesters &&
                semesters.map((data) => (
                  <Option value={data.id}>{data.name}</Option>
                ))}
            </Select>
          </Space>
          <Selection
            title={'Khóa'}
            schoolYear={schoolYear}
            setSchoolYear={setSchoolYear}
            showCamera={showCamera}
            schoolYears={schoolYears}
          />
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
              setClassIdChart={setClassIdChart}
              setShowCamera={setShowCamera}
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
      {showCamera && (
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
      )}
    </div>
  );
};

export default Report;

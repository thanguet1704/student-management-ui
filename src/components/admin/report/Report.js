import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import { createFromIconfontCN } from '@ant-design/icons';
import {
  Breadcrumb,
  Card,
  Col,
  Layout,
  Row,
  Space,
  Typography,
  DatePicker,
} from 'antd';
import 'date-fns';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Chart } from './components/Chart';
import { TableReport } from './components/TableReport';
import { TotalCard } from './components/TotalCard';
import { Selection } from '../../../common/components/Selection';
import { axiosClient } from '../../../api';

const { Content } = Layout;
const { RangePicker } = DatePicker;
const dateFormat = 'DD-MM-YYYY';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const Report = () => {
  const [schoolYears, setSchoolYears] = useState([{ id: 1, name: 'K70' }]);
  const [schoolYear, setSchoolYear] = useState({ id: 1, name: 'K70' });

  const [statAtendence, setStatAttendence] = useState();
  const [classIdChart, setClasdIdChart] = useState();
  const [startDateReport, setStartDateReport] = useState(
    new Date().toISOString()
  );
  const [endDateReport, setEndDateReport] = useState(new Date().toISOString());

  const handleGetStatAttendence = () => {
    axiosClient
      .get(`/attendence/attendenceStats?schoolYearId=${schoolYear.id}`)
      .then((res) => setStatAttendence(res.data.stat));
  };

  const handleGetSchoolYears = () => {
    axiosClient.get('/schoolYears').then((res) => setSchoolYears(res.data));
  };

  useEffect(() => {
    handleGetSchoolYears();
    handleGetStatAttendence();
  }, [schoolYear, startDateReport, endDateReport, classIdChart]);
  return (
    <div>
      <Breadcrumb
        style={{
          margin: '16px 0',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}
      >
        <Breadcrumb.Item style={{ color: '#5BC3B2', fontWeight: 'bold' }}>
          <Typography style={{ color: '#5BC3B2' }}>
            BÁO CÁO ĐIỂM DANH
          </Typography>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          padding: 24,
          background: '#fff',
        }}
      >
        <Row
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: 20,
            marginBottom: 20,
          }}
        >
          <Space>
            <Selection
              title={'Khóa'}
              schoolYear={schoolYear}
              setSchoolYear={setSchoolYear}
              schoolYears={schoolYears}
            />
            <Space>
              <Typography>Lọc theo ngày:</Typography>
            </Space>
            <Space direction="vertical" size={12}>
              <RangePicker
                defaultValue={[
                  moment(moment().subtract(7, 'd'), dateFormat),
                  moment(new Date(), dateFormat),
                ]}
                size="large"
              />
            </Space>
          </Space>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <TotalCard
            title={'Tổng lượt điểm danh'}
            stat={statAtendence?.total}
            icon={
              <PeopleAltOutlinedIcon
                style={{ fontSize: 50, color: '#5BC3B2' }}
              />
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
                background: '#BFFAD3',
                borderRadius: 10,
                border: '1px solid #0EFC5E',
              }}
            >
              <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Biểu đồ thống kê số lượt vắng học trong năm 2021
              </Typography>
              <Chart />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              bodyStyle={{
                background: '#BFFAD3',
                borderRadius: 10,
                border: '1px solid #0EFC5E ',
              }}
            >
              <TableReport />
            </Card>
          </Col>
        </Row>
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
      </Content>
    </div>
  );
};

export default Report;

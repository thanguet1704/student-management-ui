import {
  BarChartOutlined,
  createFromIconfontCN,
  ScheduleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import {
  Breadcrumb,
  Card,
  Col,
  DatePicker,
  Layout,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import 'date-fns';
import moment from 'moment';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HeaderComponent } from '../../common/components/HeaderComponent';
import { SideBar } from '../../common/components/SideBar';
import { Chart } from './Chart';
import { TableReport } from './TableReport';
import { TableReportAttendence } from './TableReportAttendence';
import { TotalCard } from './TotalCard';
import ReactPlayer from 'react-player';
import { TableStudentInfo } from './member/TableStudentInfo';
import { TableTeacherInfo } from './member/TableTeacherInfo';
import { AdminSchedule } from './schedule/AdminSchedule';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

const { Option } = Select;

const dateFormat = 'DD-MM-YYYY';
const { RangePicker } = DatePicker;

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const listMenu = [
  {
    key: 1,
    path: '/admin/studentManagement',
    display: 'Quản lý điểm danh',
    icon: <ScheduleOutlined />,
    public: true,
  },
  {
    key: 2,
    path: '/admin/report',
    display: 'Báo cáo điểm danh',
    icon: <BarChartOutlined />,
    public: true,
  },
  {
    key: 3,
    display: 'Quản lý thành viên',
    icon: <UserOutlined />,
    subMenu: [
      {
        key: 4,
        display: 'Học viên',
        path: '/admin/studentInfo',
      },
      {
        key: 5,
        display: 'Giảng viên',
        path: '/admin/teacherInfo',
      },
    ],
    public: false,
  },
  {
    key: 6,
    path: '/admin/schedule',
    display: 'Thời khóa biểu',
    icon: <ScheduleOutlined />,
    public: false,
  },
];

const { Content } = Layout;

const total = [
  {
    total: 230,
    title: 'Tổng số sinh viên',
    icon: <PeopleAltOutlinedIcon style={{ fontSize: 50, color: '#5BC3B2' }} />,
  },
  {
    total: 30,
    title: 'Số lượt nghỉ',
    icon: (
      <IconFont type="icon-tuichu" style={{ fontSize: 50, color: '#5BC3B2' }} />
    ),
    rate: '5%',
  },

  {
    total: 40,
    title: 'Số lượt đi muộn',
    icon: <WatchLaterIcon style={{ fontSize: 50, color: '#5BC3B2' }} />,
    rate: '6%',
  },

  {
    total: 30,
    title: 'Số lượt về giữa giờ',
    icon: <WatchLaterIcon style={{ fontSize: 50, color: '#5BC3B2' }} />,
    rate: '5%',
  },
];

export const Admin = () => {
  return (
    <Layout>
      <HeaderComponent />
      <Layout>
        <SideBar listMenu={listMenu} />
        <Layout style={{ padding: '0 24px 24px', minHeight: '93vh' }}>
          <Switch>
            <Route path="/admin/studentManagement" exact>
              <Breadcrumb
                style={{
                  margin: '16px 0',
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}
              >
                <Breadcrumb.Item
                  style={{ color: '#5BC3B2', fontWeight: 'bold' }}
                >
                  THÔNG TIN ĐIỂM DANH
                </Breadcrumb.Item>
              </Breadcrumb>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: '#fff',
                }}
              >
                <TableReportAttendence />
              </Content>
            </Route>
            <Route path="/admin/report" exact>
              <Breadcrumb
                style={{
                  margin: '16px 0',
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}
              >
                <Breadcrumb.Item
                  style={{ color: '#5BC3B2', fontWeight: 'bold' }}
                >
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
                    <Space>
                      <Typography>Khóa: </Typography>
                      <Select
                        defaultValue="all"
                        style={{
                          width: 120,
                        }}
                        size="large"
                      >
                        <Option value="all">All</Option>
                        <Option value="K70">K70</Option>
                        <Option value="K69">K69</Option>
                        <Option value="K71">K71</Option>
                        <Option value="K72">K72</Option>
                      </Select>
                    </Space>
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
                  <TotalCard totals={total} />
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
                      <Typography
                        style={{ textAlign: 'center', fontWeight: 'bold' }}
                      >
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
            </Route>
            <Route path="/admin/studentInfo" exact>
              <Breadcrumb
                style={{
                  margin: '16px 0',
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}
              >
                <Breadcrumb.Item
                  style={{ color: '#5BC3B2', fontWeight: 'bold' }}
                >
                  DANH SÁCH HỌC VIÊN
                </Breadcrumb.Item>
              </Breadcrumb>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: '#fff',
                }}
              >
                <TableStudentInfo />
              </Content>
            </Route>
            <Route path="/admin/teacherInfo" exact>
              <Breadcrumb
                style={{
                  margin: '16px 0',
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}
              >
                <Breadcrumb.Item
                  style={{ color: '#5BC3B2', fontWeight: 'bold' }}
                >
                  DANH SÁCH GIẢNG VIÊN
                </Breadcrumb.Item>
              </Breadcrumb>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: '#fff',
                }}
              >
                <TableTeacherInfo />
              </Content>
            </Route>
            <Route path="/admin/schedule" exact>
              <Content
                style={{
                  padding: 24,
                  height: '100%',
                }}
              >
                <AdminSchedule />
              </Content>
            </Route>
          </Switch>
        </Layout>
      </Layout>
    </Layout>
  );
};

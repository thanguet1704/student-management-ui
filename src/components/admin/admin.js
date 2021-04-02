import { AppstoreOutlined, ScheduleOutlined } from '@ant-design/icons';
import CallMissedOutgoingOutlinedIcon from '@material-ui/icons/CallMissedOutgoingOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import { Breadcrumb, Layout, Typography, Space, DatePicker, Card } from 'antd';
import moment from 'moment';
import { Route, Switch } from 'react-router-dom';
import { HeaderComponent } from '../../common/components/HeaderComponent';
import { SideBar } from '../../common/components/SideBar';
import { Chart } from './Chart';
import { ReportContent } from './ReportContent';
import { TableReportAttendence } from './TableReportAttendence';
import { TotalCard } from './TotalCard';
import { Row, Col } from 'antd';

const { RangePicker } = DatePicker;

const listMenu = [
  {
    key: 1,
    path: '/admin/studentManagement',
    display: 'Quản lý học viên',
    icon: <AppstoreOutlined />,
  },
  {
    key: 2,
    path: '/admin/report',
    display: 'Báo cáo điểm danh',
    icon: <ScheduleOutlined />,
  },
];

const { Content } = Layout;

const total = [
  {
    total: 230,
    title: 'Tổng số sinh viên',
    icon: <PeopleAltOutlinedIcon />,
  },
  {
    total: 30,
    title: 'Số lượt nghỉ',
    icon: <CallMissedOutgoingOutlinedIcon />,
    rate: '5%',
  },

  {
    total: 40,
    title: 'Số lượt đi muộn',
    icon: <PeopleAltOutlinedIcon />,
    rate: '6%',
  },

  {
    total: 30,
    title: 'Số lượt nghỉ',
    icon: <PeopleAltOutlinedIcon />,
    rate: '5%',
  },
];

const dateFormat = 'DD-MM-YYYY';

export const admin = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderComponent />
      <Layout>
        <SideBar listMenu={listMenu} />
        <Layout style={{ padding: '0 24px 24px' }}>
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
                  <Typography>BÁO CÁO ĐIỂM DANH</Typography>
                </Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  padding: 24,
                  background: '#fff',
                }}
              >
                <Space style={{ marginLeft: 50 }}>
                  <Typography>Chọn ngày:</Typography>
                  <RangePicker
                    defaultValue={[
                      moment(moment().subtract(7, 'd'), dateFormat),
                      moment(new Date(), dateFormat),
                    ]}
                    style={{ width: '70%' }}
                  />
                </Space>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: 20,
                  }}
                >
                  <TotalCard totals={total} />
                </div>
                <Row>
                  <Col span={12}>
                    <div
                      style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 30,
                      }}
                    >
                      <Typography style={{ fontSize: '1rem' }}>
                        Biểu đồ thống kê số lượt vắng học trong năm 2021
                      </Typography>
                      <Chart />
                    </div>
                  </Col>
                  <Col span={12}>
                    <TableReportAttendence />
                  </Col>
                </Row>
              </Content>
            </Route>
          </Switch>
        </Layout>
      </Layout>
    </Layout>
  );
};

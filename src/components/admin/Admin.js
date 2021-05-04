import {
  BarChartOutlined,
  ScheduleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import 'date-fns';
import { Route, Switch } from 'react-router-dom';
import { SideBar } from '../../common/components/SideBar';
import AdminSchedule from './schedule/AdminSchedule';
import Report from './report/Report';
import AdminAttendence from './attendence/AdminAttendence';
import Member from './member/Member';

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

export const Admin = (props) => {
  return (
    <Layout>
      <Layout>
        <SideBar listMenu={listMenu} role={props.auth.role} />
        <Layout style={{ padding: '0 24px 24px', minHeight: '93vh' }}>
          <Switch>
            <Route path="/admin/studentManagement" exact>
              <AdminAttendence />
            </Route>
            <Route path="/admin/report" exact>
              <Report />
            </Route>
            <Route>
              <Member />
            </Route>
            <Route path="/admin/schedule">
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

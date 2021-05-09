import { AppstoreOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout } from 'antd';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SideBar } from '../../common/components/SideBar';
import { TableStudentAttendence } from './TableStudentAttendence';
import { TableStudentSchedule } from './TableStudentSchedule';
import { HeaderComponent } from '../../common/components/HeaderComponent';

const { Content } = Layout;

const listMenu = [
  {
    key: 'attendence',
    path: '/attendence',
    display: 'Thông tin điểm danh',
    icon: <AppstoreOutlined />,
    public: true,
  },
  {
    key: 'schedule',
    path: '/schedule',
    display: 'Thời khóa biểu',
    icon: <ScheduleOutlined />,
    public: true,
  },
];

export const Student = () => {
  const [searchName, setSearchName] = useState('');

  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderComponent />
      <Layout>
        <SideBar listMenu={listMenu} />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Switch>
            <Route path="/attendence" exact>
              <TableStudentAttendence
                searchName={searchName}
                setSearchName={setSearchName}
              />
            </Route>
            <Route path="/schedule" exact>
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
                  THỜI KHÓA BIỂU
                </Breadcrumb.Item>
              </Breadcrumb>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: '#fff',
                  border: '10px solid #5BC3B2',
                }}
              >
                <TableStudentSchedule />
              </Content>
            </Route>
          </Switch>
        </Layout>
      </Layout>
    </Layout>
  );
};

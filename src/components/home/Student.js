import { Layout } from 'antd';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SideBar } from '../../common/components/SideBar';
import { TableStudentAttendence } from './components/TableStudentAttendence';
import { TableStudentSchedule } from './components/TableStudentSchedule';
import { HeaderComponent } from '../../common/components/HeaderComponent';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2580724_yq81g4eg939.js',
});

const { Content } = Layout;

const listMenu = [
  {
    key: 'attendence',
    path: '/attendence',
    display: 'Thông tin điểm danh',
    icon: <IconFont type="icon-information" />,
    public: true,
  },
  {
    key: 'schedule',
    path: '/schedule',
    display: 'Thời khóa biểu',
    icon: <IconFont type="icon-schedule" />,
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
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
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

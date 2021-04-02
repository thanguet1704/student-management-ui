import {
  AppstoreOutlined,
  ScheduleOutlined,
  UploadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Input, Layout, Upload } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { HeaderComponent } from '../../common/components/HeaderComponent';
import { SideBar } from '../../common/components/SideBar';
import { TableStudentAttendence } from './TableStudentAttendence';
import { TableStudentSchedule } from './TableStudentSchedule';

const { Content } = Layout;

const listMenu = [
  {
    key: 'attendence',
    path: '/attendence',
    display: 'Thông tin điểm danh',
    icon: <AppstoreOutlined />,
  },
  {
    key: 'schedule',
    path: '/schedule',
    display: 'Thời khóa biểu',
    icon: <ScheduleOutlined />,
  },
];

export const Student = () => {
  const onSearch = (value) => console.log(value);

  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderComponent />
      <Layout>
        <SideBar listMenu={listMenu} />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Switch>
            <Route path="/attendence" exact>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Input
                  size="large"
                  placeholder="Tìm kiếm theo chuyên đề"
                  prefix={<SearchOutlined />}
                  style={{ borderRadius: 5, width: '20%' }}
                />
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
                <Upload>
                  <Button icon={<UploadOutlined />}>Export</Button>
                </Upload>
                ,
              </div>

              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: '#fff',
                }}
              >
                <TableStudentAttendence />
              </Content>
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

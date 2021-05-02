import {
  AppstoreOutlined,
  FileExcelFilled,
  ScheduleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Input, Layout, Upload } from 'antd';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
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
    <Layout style={{ height: '93vh' }}>
      <Layout>
        <SideBar listMenu={listMenu} />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Switch>
            <Route path="/attendence" exact>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Input
                    size="small"
                    placeholder="Tìm kiếm theo chuyên đề"
                    prefix={<SearchOutlined />}
                    style={{ borderRadius: 5, width: '80%', height: '70%' }}
                    onChange={(e) => {
                      setSearchName(e.target.value);
                    }}
                  />
                </div>
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Upload>
                    <Button
                      icon={
                        <FileExcelFilled
                          style={{
                            color: '#366F38',
                          }}
                        />
                      }
                      size="large"
                    >
                      Export
                    </Button>
                  </Upload>
                </div>
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
                <TableStudentAttendence searchName={searchName} />
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

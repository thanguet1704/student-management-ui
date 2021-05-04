import { Breadcrumb, Layout } from 'antd';
import 'date-fns';
import { Route } from 'react-router-dom';
import { TableStudentInfo } from './components/TableStudentInfo';
import { TableTeacherInfo } from './components/TableTeacherInfo';

const { Content } = Layout;

const Member = () => {
  return (
    <div>
      <Route path="/admin/studentInfo" exact>
        <Breadcrumb
          style={{
            margin: '16px 0',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '1.5rem',
          }}
        >
          <Breadcrumb.Item style={{ color: '#5BC3B2', fontWeight: 'bold' }}>
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
          <Breadcrumb.Item style={{ color: '#5BC3B2', fontWeight: 'bold' }}>
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
    </div>
  );
};

export default Member;

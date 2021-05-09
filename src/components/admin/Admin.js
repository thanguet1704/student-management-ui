import { Layout } from 'antd';
import 'date-fns';
import { Route, Switch } from 'react-router-dom';
import { SideBar } from '../../common/components/SideBar';
import AdminSchedule from './schedule/AdminSchedule';
import Report from './report/Report';
import AdminAttendence from './attendence/AdminAttendence';
import Member from './member/Member';
import { ListMenuAdmin } from '../../common/routeConfig/adminRoute';
import { AuthContext } from '../../contexts/AuthProvider';
import { useContext } from 'react';
import { HeaderComponent } from '../../common/components/HeaderComponent';

export const Admin = (props) => {
  const { auth } = useContext(AuthContext);

  return (
    <Layout>
      <HeaderComponent />
      <Layout>
        <SideBar listMenu={ListMenuAdmin} role={auth.role} />
        <Layout style={{ padding: '0 24px', minHeight: '93vh' }}>
          <Switch>
            <Route path="/admin/studentManagement" exact>
              <AdminAttendence />
            </Route>
            <Route path="/admin/report" exact>
              <Report />
            </Route>
            <Route path="/admin/schedule" exact>
              <AdminSchedule />
            </Route>
            <Route>
              <Member />
            </Route>
          </Switch>
        </Layout>
      </Layout>
    </Layout>
  );
};

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import { AuthApi } from './api';
import { HeaderComponent } from './common/components/HeaderComponent';
import { Admin } from './components/admin/Admin';
import { Student } from './components/home/Student';
import { Login } from './components/login/Login';
import AuthProvider from './contexts/AuthProvider';
import './index.css';
import AdminRoute from './utils/AdminRoute';
import LoginRoute from './utils/LoginRoute';
import StudentRoute from './utils/StudentRoute';

const authApi = new AuthApi();

export default function App() {
  const [auth, setAuth] = useState({});
  const [error, setError] = useState(false);
  let history = useHistory();

  useEffect(() => {
    authApi
      .auth()
      .then((res) => {
        if (res.status === 200) {
          setAuth(res.data);
        }
      })
      .catch((err) => {
        setError(true);
        // history.push('/');
      });
  }, [auth.isAuth]);

  return (
    <div className="container">
      <AuthProvider>
        <Router>
          <HeaderComponent auth={auth} />
          <Switch>
            <AdminRoute path="/admin" component={() => <Admin auth={auth} />} />
            <LoginRoute path="/" component={Login} exact />
            <StudentRoute path="/attendence" component={Student} />
            <StudentRoute path="/schedule" component={Student} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

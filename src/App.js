import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Admin } from './components/admin/Admin';
import { Student } from './components/home/Student';
import { Login } from './components/login/Login';
import AuthProvider from './contexts/AuthProvider';
import './index.css';
import AdminRoute from './utils/AdminRoute';
import LoginRoute from './utils/LoginRoute';
import StudentRoute from './utils/StudentRoute';
import { CookiesProvider } from 'react-cookie';

export default function App() {
  return (
    <div className="container">
      <AuthProvider>
        <CookiesProvider>
          <Router>
            <Switch>
              <AdminRoute path="/admin" component={Admin} />
              <LoginRoute path="/" component={Login} exact />
              <StudentRoute path="/attendence" component={Student} />
              <StudentRoute path="/schedule" component={Student} />
            </Switch>
          </Router>
        </CookiesProvider>
      </AuthProvider>
    </div>
  );
}

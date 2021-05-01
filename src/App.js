import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthApi } from './api';
import { HeaderComponent } from './common/components/HeaderComponent';
import { Admin } from './components/admin/Admin';
import { Student } from './components/home/Student';
import { Login } from './components/login/Login';
import './index.css';
import { NotFound } from './common/components/NotFound';

const authApi = new AuthApi();

export default function App() {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    authApi.auth().then((res) => {
      if (res.status === 200) {
        setAuth(res.data);
      }
    });
  }, [auth.isAuth]);

  return (
    <div className="container">
      <Router>
        <HeaderComponent auth={auth} />
        <Switch>
          <Route path="/admin">{<Admin />}</Route>
          <Route path="/login">{<Login />}</Route>
          <Route path="/attendence">{<Student />}</Route>
          <Route path="/schedule">{<Student />}</Route>
        </Switch>
        <Route path="/">
          <NotFound />
        </Route>
      </Router>
    </div>
  );
}

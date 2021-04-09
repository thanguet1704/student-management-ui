import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { AuthApi } from './api';
import { Admin } from './components/admin/admin';
import { Student } from './components/home/Student';
import { Login } from './components/login/Login';
import './index.css';

const authApi = new AuthApi();

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    authApi.auth().then((res) => {
      setAuth(res.status === 200);
    });
  });

  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/admin">
            <Route path="/">
              {auth ? <Admin /> : <Redirect to="/login" />}
            </Route>
          </Route>
          <Route path="/login" component={Login}>
            <Route path="/">
              {!auth ? <Login /> : <Redirect to="/attendence" />}
            </Route>
          </Route>
          <Route path="/">
            <Route path="/attendence">
              {auth ? <Student /> : <Redirect to="/login" />}
            </Route>
            <Route path="/schedule">
              {auth ? <Student /> : <Redirect to="/login" />}
            </Route>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

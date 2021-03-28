import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dashboard } from './components/admin/Dashboard';
import { StudentScreen } from './components/home/StudentScreen';
import { Login } from './components/login/Login';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/" component={StudentScreen} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('container')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { admin } from './components/admin/admin';
import { Student } from './components/home/Student';
import { Login } from './components/login/Login';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/admin" component={admin} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Student} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('container')
);

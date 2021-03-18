import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Login } from './components/login/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Dashboard } from './components/home/Dashboard.js';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/login" exact component={Login}/> 
    </Router>
    <Router>
      <Route path="/" exact component={Dashboard} />
    </Router>
  </React.StrictMode>,
  document.getElementById('container')
);

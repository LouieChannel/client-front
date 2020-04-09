import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/login/Login';
import Logist from './pages/Logist';
import Driver from './pages/Driver';
import CreateTask from './pages/CreateTask';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logist">
            <Logist />
          </Route>
          <Route path="/driver">
            <Driver />
          </Route>
          <Route path="/create-task">
            <CreateTask />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

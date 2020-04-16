import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Logist from './pages/Logist/Logist';
import Driver from './pages/Driver/Driver';
import CreateTask from './pages/CreateTask/CreateTask';

const getUser = () => {
  const token = localStorage.getItem('access_token');
  const role = localStorage.getItem('role');
  return {
    isAuthenticated: token && token.length > 0,
    role: role ? role : null,
  };
};

function PrivateRoute({ children, ...rest }) {
  const user = getUser();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/Login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
function LogistPrivateRoute({ children, ...rest }) {
  const user = getUser();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.isAuthenticated && user.role === 'Logist' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/Login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
function DriverPrivateRoute({ children, ...rest }) {
  const user = getUser();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.isAuthenticated && user.role === 'Driver' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/Login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <LogistPrivateRoute path="/logist">
            <Logist />
          </LogistPrivateRoute>
          <DriverPrivateRoute path="/driver">
            <Driver />
          </DriverPrivateRoute>
          <PrivateRoute path="/create-task">
            <CreateTask />
          </PrivateRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Logist from './pages/Logist/Logist';
import Driver from './pages/Driver/Driver';
import CreateTask from './pages/CreateTask/CreateTask';
import SignUp from './pages/SignUp/SignUp';
import UpdateTask from './pages/UpdateTask/UpdateTask';

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
			render={({ location }) => {
				if (!user.isAuthenticated)
					return (
						<Redirect
							to={{
								pathname: '/Login',
								state: { from: location },
							}}
						/>
					);

				if (user.role === 'Logist')
					return (
						<Redirect
							to={{
								pathname: '/logist',
								state: { from: location },
							}}
						/>
					);

				if (user.role === 'Driver')
					return (
						<Redirect
							to={{
								pathname: '/driver',
								state: { from: location },
							}}
						/>
					);
			}}
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
					<Route path="/sign_up">
						<SignUp />
					</Route>
					<LogistPrivateRoute path="/logist">
						<Logist />
					</LogistPrivateRoute>
					<DriverPrivateRoute path="/driver">
						<Driver />
					</DriverPrivateRoute>
					<DriverPrivateRoute path="/update-task">
						<UpdateTask />
					</DriverPrivateRoute>
					<LogistPrivateRoute path="/create-task">
						<CreateTask />
					</LogistPrivateRoute>
					<PrivateRoute path="/">
						<Home />
					</PrivateRoute>
				</Switch>
			</Router>
		</>
	);
}

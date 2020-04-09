import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login2 from './pages/login/Login2';

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login">
                        <Login2 />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

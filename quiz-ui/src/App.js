import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch  } from "react-router-dom";
import './App.css';
import Login from './components/Login'
import AdminDashboard from './components/Admin.dashboard'
import UserDashboard from './components/User.dashboard'
import TestDetails from './components/TestDetails'
import StartTest from './components/StartTest'
import Score from './components/Score'
function App() {
  return (
    <Router>
					<div>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/admin-dashboard" component={AdminDashboard} />
						<Route exact path="/user-dashboard" component={UserDashboard} />
						<Route exact path="/test-details" component={TestDetails} />
						<Route exact path="/start-test" component={StartTest} />
						<Route exact path="/score" component={Score} />
						<Redirect from="/" to="login" />
					</Switch>
					</div>
				</Router>
  );
}

export default App;

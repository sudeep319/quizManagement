import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch  } from "react-router-dom";
import './App.css';
import Login from './components/Login'
import AdminDashboard from './components/Admin.dashboard'
import TestDetails from './components/TestDetails'
function App() {
  return (
    <Router>
					<div>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/admin-dashboard" component={AdminDashboard} />
						<Route exact path="/test-details" component={TestDetails} />
						<Redirect from="/" to="login" />
					</Switch>
					</div>
				</Router>
  );
}

export default App;

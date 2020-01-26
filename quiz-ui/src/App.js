import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch  } from "react-router-dom";
import './App.css';
import Login from './components/Login'
function App() {
  return (
    <Router>
					<div className="App">
					<Switch>
						<Route exact path="/login" component={Login} />
						<Redirect from="/" to="login" />
					</Switch>
					</div>
				</Router>
  );
}

export default App;

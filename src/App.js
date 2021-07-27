<<<<<<< HEAD
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
=======
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
>>>>>>> 31fb8a675fd5e0e27b20e44a332e144c2383b636

import SignUp from "./components/SignUp/SignUp";
import ContentUser from "./components/ContentUser/ContentUser";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <SignUp />
            </Route>
            <Route path="/confirmation">
              <ContentUser />
            </Route>
            <Route path="/summary">
              <ContentUser />
            </Route>
            <Route path="/seats/:id">
              <ContentUser />
            </Route>
            <Route path="/hours/:id">
              <ContentUser />
            </Route>
            <Route path="/dashboard">
              <ContentUser />
            </Route>
            <Route path="/calendar">
              <ContentUser />
            </Route>
            <Route path="/booking/:id">
              <ContentUser />
            </Route>
            <Route path="/classrooms">
              <ContentUser />
            </Route>
            <Route path="/salles/:id">
              <ContentUser />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import { Search, Events } from './pages';

export function AppWithRouter() {
  return (
    <Router>
      <Route path="/" exact component={Search} />
      <Route path="/events/:artistName" exact component={Events} />
    </Router>
  );
}


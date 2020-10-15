import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MapComponent from './components/MapComponent';

function App() {
  
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' />
        </Switch>
      </Router>
     <MapComponent />
    </>
  );
}

export default App;

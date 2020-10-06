import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' />
        </Switch>
      </Router>
      <div className='wrapper'>
        <div className='map'>
        <h1>Map Box</h1>
        </div>
        <div className='reviews'>
            <h1>Reviews Box</h1>
        </div>
      </div>
    </>
  );
}

export default App;

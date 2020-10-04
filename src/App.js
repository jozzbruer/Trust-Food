import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className='header'>
        <Navbar variant="dark">
          <Navbar.Brand href="#home">TRUE FOOD</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Filter Here
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </div>
  );
}

export default App;

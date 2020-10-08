import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const [isMobile, setIsMobile] = useState(false)
  const [review, setReview] = useState(false)

  useEffect(()=>{
    // window.addEventListener("resize", () => {
      const ismobile = window.innerWidth <= 425;
      if (ismobile) setIsMobile(!isMobile);
  // }, true);
  }, [])

  function handleSwich(){
    setReview(!review)
  }
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' />
        </Switch>
      </Router>
      <div className={`${isMobile ? "" : "displayButton"}`}>
        <label onChange={handleSwich} className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
       </div>
      
      <div className='wrapper'>
        <div className={`map ${review ? 'display' : ''}`}>
        <h1>Map Box</h1>
        </div>
        <div className={`reviews ${review ? '' : 'display'}`}>
            <h1>Reviews Box</h1>
        </div>
      </div>
    </>
  );
}

export default App;

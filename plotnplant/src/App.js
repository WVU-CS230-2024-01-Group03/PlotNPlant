// import logo from './logo.svg';
import './App.css';
import Cal from './Cal';
import * as React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
 // import { Calendar } from 'rsuite'; 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cal />} />
      </Routes>
    </BrowserRouter>

      {/* <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant"></img>
      <Calendar compact bordered /> */}
    </div>
  );
}

export default App;

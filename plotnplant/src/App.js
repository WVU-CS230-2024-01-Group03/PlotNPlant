// import logo from './logo.svg';
import './App.css';
 
import React from 'react'
import { Calendar } from 'rsuite'; 

function App() {
  return (
    <div className="App">
      <title>Plot N' Plant</title>
      <h1>Plot N' Plant</h1>
      <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant"></img>
      <Calendar compact bordered />
    </div>
  );
}

export default App;

import { Calendar } from 'rsuite';
import React from 'react';
import { Link } from 'react-router-dom';
import './Cal.css';

function Cal() {
    return (
      <div className="Cal">
        <title>Plot N' Plant</title>
        <h1>Plot N' Plant</h1>
        <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant"></img>
        <p><Link to="/">Login</Link></p>
        <Calendar compact bordered />
      </div>
    );
  }

  export default Cal;
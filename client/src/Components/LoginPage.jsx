import React from 'react';
import './loginPage.css';
import { Link } from 'react-router-dom';
import Auth from '../Components/auth';

const LoginPage = () => { 
  return (
    <div className='login'>
    <div className="ring-container">
      <div className="text-container">
      <h1>Plot N' Plant</h1>
        <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant" width="80px"></img>
        <Auth/>
      </div>
      <div className="ring">
        <div className="ring-element"></div>
        <div className="ring-element"></div>
        <div className="ring-element"></div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
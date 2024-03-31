import React from 'react';
import './Styles.css';
import { FaUser, FaLock} from "react-icons/fa";
import { Link } from 'react-router-dom';
import Auth from '../Components/auth';



const LoginPage = () => {
  return(
    <html className='page'>
      <div class='wrapper'>
        <h1>Plot N' Plant</h1>
        <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant" width="80px"></img>

        <Auth/>

      </div>
      </html>
  );
};

export default LoginPage;
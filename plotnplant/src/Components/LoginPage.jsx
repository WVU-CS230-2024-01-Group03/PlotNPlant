import React from 'react';
import './LoginPage.css';
import { FaUser, FaLock} from "react-icons/fa";
import { Link } from 'react-router-dom';



const LoginPage = () => {
  return(
      <div class='wrapper'>
        <h1>Plot N' Plant</h1>
        <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant" width="80px"></img>

        <form action="">
          <div className='input-box'>
            <input type="text" placeholder='Username' required />
            <FaUser className='icon'/>
          </div>
          <div className='input-box'>
            <input type="password" placeholder='Password' required />
            <FaLock className='icon'/>
          </div>

          <button type="submit">Login</button>
          

            <div className="register-account">
              <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
            <div className="Calendar">
              <p>Want to view the calendar? <Link to="/cal">Calendar</Link></p>
            </div>

        </form>
      </div>

  );
};

export default LoginPage;
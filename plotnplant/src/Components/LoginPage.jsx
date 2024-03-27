import React from 'react';
import './LoginPage.css';
import { FaUser, FaLock} from "react-icons/fa";
import { Link } from 'react-router-dom';



const LoginPage = () => {
  return(
      <div class='wrapper_loginpage'>
        <h1>Plot N' Plant</h1>
        <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant" width="80px"></img>

        <form action="/homepage">
          <div className='login_input_box'>
            <input type="text" placeholder='Username' required />
            <FaUser className='login_icon'/>
          </div>
          <div className='login_input_box'>
            <input type="password" placeholder='Password' required />
            <FaLock className='login_icon'/>
          </div>

        
          <button type="submit">Login</button>
          

            <div className="login_register_account">
              <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
            <div className="Calendar">
              <p>Want to view the calendar? <Link to="/cal">Calendar</Link></p>
            </div>
            <div className="Settings">
              <p>Want to view settings? <Link to ="/settings">Settings</Link></p>
            </div>

        </form>
      </div>

  );
};

export default LoginPage;
import React from 'react';
import './RegisterPage.css';
import { Link } from 'react-router-dom';

const RegisterPage = () =>{
  return(
    <div class='wrapper_registerpage'>
    <h1>Plot N' Plant</h1>
    <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant" width="80px"></img>
    <form action="">
    <div className='register_input_box'>
        <input type="text" id="emailInput" placeholder='E-Mail' required />
  
      </div>
      <div className='register_input_box'>
        <input type="text" id="usernameInput" placeholder='Username' required />
      </div>
      <div className='register_input_box'>
        <input type="password" id="passwordInput" placeholder='Password' required />
      </div>
      <div className='register_input_box'>
        <input type="password" id="passwordInputConfirm" placeholder='Re-enter Password' required />
      </div>

      <button type="submit">Sign Up</button>

        <div className="register_register_account">
          <p>Already have an Account?</p><Link to="/">Login</Link>
        </div>

    </form>
  </div>
  );
}

export default RegisterPage
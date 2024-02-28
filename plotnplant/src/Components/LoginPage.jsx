import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  return(
      <div className='wrapper'>
        <h1>Plot N' Plant<img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant" width="80px"></img></h1>
        

        <form action="">
          <div className='input-box'>
            <input type="text" placeholder='Username' required />
          </div>
          <div className='input-box'>
            <input type="password" placeholder='Password' required />
          </div>

          <button type="submit">Login</button>

          <div className="register-account">
            <p>Don't have an account? <a href="#">Register</a></p>
          </div>
        </form>
      </div>

  );
};

export default LoginPage;
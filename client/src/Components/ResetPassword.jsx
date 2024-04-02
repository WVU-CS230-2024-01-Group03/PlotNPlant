import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Config/firebase';
import { useState } from 'react';
import React from 'react'
import { Link } from 'react-router-dom';
import './Styles.css';

//function to handle password reset
function ResetPassword() {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your email.");
    }catch(err){
      console.log(err);
    }
  }
  return (
      <html className='page'>
        <div className='wrapper'>
            <div>
            <h1>Plot N' Plant</h1>
              <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant" width="80px"></img>
              <div>
                <input type="email" className="reset-password-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/> <br></br>
                <button className="button" onClick={handleResetPassword}>Reset Password</button>
                <Link to="/">
                   <button className="button">Back to Login</button>
                </Link>
              </div>
            </div>
        </div>
      </html>
  )
}

export default ResetPassword

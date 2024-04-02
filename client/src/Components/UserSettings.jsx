import React from 'react'
import { useState, useEffect } from 'react';
import { updateEmail, updatePassword, sendEmailVerification, applyActionCode, sendPasswordResetEmail, getAuth } from 'firebase/auth';
import {auth} from "../Config/firebase";
import './Home.css'

function UserSettings() {
 const [currentUser, setCurrentUser] = useState('');
 const [newEmail, setNewEmail] = useState('');
 const [newPassword, setNewPassword] = useState('');

 useEffect(() => {
  const fetchCurrentUser = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        setCurrentUser(user.email);
      } else {
        console.log("No user is logged in");
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchCurrentUser();
}, []);

  const handleChangeEmail = async () => {
    try{
      await updateEmail(auth.currentUser, newEmail);
      setCurrentUser(newEmail);
      setNewEmail('');
      console.log("Email updated successfully.");
    }catch(err){
      console.log(err);
    }
  };

  //function to send password reset email to the currently logged in user
  const handleChangePassword = async () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then(() => {
        alert("Password email sent. Check your inbox.")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };


  return (
    <div>
      <h1>
        Settings
      </h1>
      <div className="current-user-email">
        <h1>Current User Email: {currentUser}</h1>
      </div>
      <div className="reset-password-container">
        <p>
          Click here to change your email:
          <button className="reset-password-button" onClick={handleChangeEmail}>Change Email</button>
        </p>
      </div>
      <div className="reset-password-container">
          <p>Click here to change your password: 
            <button className="reset-password-button" onClick={handleChangePassword}>Change Password</button>
          </p>
      </div>
    </div>
  )
}

export default UserSettings

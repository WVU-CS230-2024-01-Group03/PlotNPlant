import React from "react";
import { useState, useEffect } from "react";
import {
  sendPasswordResetEmail,
  getAuth,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { auth } from "../Config/firebase";
import "./Home.css";
import { Link } from "react-router-dom";

function UserSettings() {
  //states for current user, email, and password
  const [currentUser, setCurrentUser] = useState("");
  const [newEmail, setNewEmail] = useState("");

  //fetchs current user based on auth
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

  useEffect(() => {
    fetchCurrentUser();
  });

  //function to handle email change, uses verifyBeforeUpdateEmail to send verification email to new email
  const handleChangeEmail = async () => {
    const auth = getAuth();
    setNewEmail(newEmail);
    await verifyBeforeUpdateEmail(auth.currentUser, newEmail).then(() => {
      alert(
        "Email verification has been sent. Check your email and login with the new email."
      );
      setCurrentUser(newEmail);
      fetchCurrentUser();
    });
  };

  //function to send password reset email to the currently logged in user
  const handleChangePassword = async () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then(() => {
        alert("Password email sent. Check your inbox.");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  return (
    <div>
      <h1>Settings</h1>
      <div className="current-user-email">
        <h1>Current User Email: {currentUser}</h1>
      </div>
      <div className="reset-password-container">
        <p>
          Click here to change your email:
          <input
            type="email"
            className="text-input"
            placeholder="Enter new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Link to="/">
            <button
              className="reset-password-button"
              onClick={handleChangeEmail}
            >
              Change Email
            </button>
          </Link>
        </p>
      </div>
      <div className="reset-password-container">
        <p>
          Click here to change your password:
          <button
            className="reset-password-button"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </p>
      </div>
      <Link to="/homepage">
        <button className="reset-password-button">Home</button>
      </Link>
    </div>
  );
}

export default UserSettings;

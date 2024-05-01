import React from "react";
import { useState, useEffect } from "react"; // Importing useState and useEffect hooks from React
import {
  updateEmail,
  updatePassword,
  sendEmailVerification,
  applyActionCode,
  sendPasswordResetEmail,
  getAuth,
  verifyBeforeUpdateEmail,
  deleteUser,
} from "firebase/auth"; // Importing Firebase authentication functions
import { auth } from "../Config/firebase"; // Importing authentication instance from Firebase configuration
import "./Home.css"; // Importing CSS styles
import { Link } from "react-router-dom"; // Importing Link component from React Router
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from React Router

function UserSettings() {
  const [currentUser, setCurrentUser] = useState("No account logged in"); // State variable to hold current user's email
  const [newEmail, setNewEmail] = useState(""); // State variable to hold new email
  const [newPassword, setNewPassword] = useState(""); // State variable to hold new password
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to fetch current user based on authentication
  const fetchCurrentUser = async () => {
    try {
      const user = auth.currentUser;
      if (user.email) {
        setCurrentUser(user.email); // Setting current user's email
      } else if (user){
        setCurrentUser("Logged in with Google Provider") // Setting current user if logged in with Google
      } else {
        alert("No user is logged in"); // Alert if no user is logged in
      }

    } catch (err) {
      console.log(err); // Logging any errors
    }
  };

  useEffect(() => {
    fetchCurrentUser(); // Fetching current user on component mount
  });

  // Function to handle email change, sends verification email to new email
  const handleChangeEmail = async () => {
    const auth = getAuth();
    setNewEmail(newEmail); // Setting new email
    await verifyBeforeUpdateEmail(auth.currentUser, newEmail).then(() => {
      alert(
        "Email verification has been sent. Check your email and login with the new email."
      ); // Alerting user about verification email
      setCurrentUser(newEmail); // Setting current user to new email
      fetchCurrentUser(); // Fetching current user
    });
  };

  // Function to send password reset email to the currently logged in user
  const handleChangePassword = async () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then(() => {
        alert("Password email sent. Check your inbox."); // Alerting user about password reset email
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode); // Logging any errors
      });
  };

  // Function to handle deleting the user's account
  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        alert("Your account has been deleted."); // Alerting user about account deletion
        navigate("/"); // Redirecting user to homepage
      })
      .catch((error) => {
        // Handling any errors
        // ...
      });
  };

  return (
    // HTML structure for user settings page
    <div class="wrap">
      <div class="leftbox">
        <h1>
          <Link to="/homepage">
            <button className="click reset-password-button">Home</button> {/* Button to navigate to homepage */}
          </Link>
        </h1>
        <h2>
          <Link to="/">
            <button className="click sign-out-button">Sign Out</button> {/* Button to sign out */}
          </Link>
        </h2>
      </div>
      <div class="rightbox">
        <h1>Settings</h1>
        <div className="current-user-email">
          <p>Current User Email: {currentUser}</p> {/* Displaying current user's email */}
        </div>
        <div className="reset-password-container">
          <p>
            Click here to change your email:
            <input
              type="email"
              className="input-txt"
              placeholder="Enter new email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            /> {/* Input field for new email */}
            <Link to="/">
              <button
                className="bttn reset-password-button"
                onClick={handleChangeEmail}
              >
                Change Email
              </button> {/* Button to change email */}
            </Link>
          </p>
        </div>
        <div className="reset-password-container">
          <p>
            Click here to change your password:
            <button
              className="bttn reset-password-button"
              onClick={handleChangePassword}
            >
              Change Password
            </button> {/* Button to change password */}
          </p>
        </div>
        <div className="delete-account-container">
          <p>
            Click here to delete your account:
            <button
              className="bttn delete-account-button"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button> {/* Button to delete account */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSettings; // Exporting UserSettings component

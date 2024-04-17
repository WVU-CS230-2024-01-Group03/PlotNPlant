import React from "react";
import { useState, useEffect } from "react";
import {
  updateEmail,
  updatePassword,
  sendEmailVerification,
  applyActionCode,
  sendPasswordResetEmail,
  getAuth,
  verifyBeforeUpdateEmail,
  deleteUser,
} from "firebase/auth";
import { auth } from "../Config/firebase";
import "./Home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserSettings() {
  const [currentUser, setCurrentUser] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

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
  //function to handle deleting the user
  const handleDeleteAccount = async (password) => {
    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        // User deleted.
        alert("Your account has been deleted.");
        navigate("/");
      })
      .catch((error) => {
        // An error occurred
        // ...
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
      <div className="delete-account-container">
        <p>
          Click here to delete your account:
          <button
            className="delete-account-button"
            onClick={handleDeleteAccount}
          >
            Delete Account
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

import React from 'react';
import { auth, googleProvider } from "../Config/firebase"; // Importing authentication and provider from Firebase configuration
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"; // Importing authentication functions from Firebase
import './Styles.css'; // Importing CSS styles
import { Link } from 'react-router-dom'; // Importing Link component from React Router
import Auth from '../Components/auth'; // Importing Auth component
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from React Router
import { useState } from 'react'; // Importing useState hook from React

const RegisterPage = () => {
  const [email, setEmail] = useState(""); // State variable to hold email input value
  const [password, setPassword] = useState(""); // State variable to hold password input value
  const navigate = useNavigate(); // Hook for programmatic navigation
  const passwordRegex = /^(?=.[A-Z])(?=.\d)/;

  const createUser = async (e) => { // Function to handle form submission
    e.preventDefault(); // Preventing default form submission behavior
    try {
      // Condition to check if email and password are provided
      if (!email || !password) {
        alert("You need to enter an email and password to create an account.");
        return;
      }
      if (!passwordRegex.test(password)) {
        alert("Password must contain an capital letter and a number.");
        return;
      }
      // Creating user with email and password using Firebase authentication
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!"); // Showing success message
      navigate('/'); // Redirecting user to homepage after successful registration
    } catch (err) {
      if (err.code === "auth/email-already-in-use") { // Checking if email is already in use
        alert("The email address is already in use. Please use a different email.");
      } else {
        // Handling other authentication errors
        console.error("Error creating user:", err.message);
        alert("An error occurred while creating your account. Please use valid credentials");
      }
    }
  }

  const goHome = () => {
    navigate('/');
  }

  return (
    // HTML structure for registration page
    <html className='page'>
      <div className='login'>
        <div className="ring-container">
          <div className="text-container">
          <div class='wrapper'>
            <h1>Plot N' Plant</h1> {/* Application title */}
            <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt="Plant" width="80px" /> {/* Plant icon */}
            <h2>Create Account</h2>
            <form onSubmit={createUser}> {/* Registration form */}
              <div>
                <input type="text" id="emailInput" placeholder='E-Mail' className="text-input" onChange={(e) => setEmail(e.target.value)} required /> {/* Email input field */}
              </div>
              <div>
                <input type="password" id="passwordInput" placeholder='Password' className="text-input" onChange={(e) => setPassword(e.target.value)} required /> {/* Password input field */}
              </div>
              <button type="submit" className="button">Sign Up</button> {/* Submit button */}
              <div className="register-account">
                <p>Already have an Account?</p>
                <button className='button' onClick={goHome}> Login </button>{/* Link to login page */}
              </div>
            </form>
          </div>
          </div>
          <div className="ring">
            <div className="ring-element"></div>
            <div className="ring-element"></div>
            <div className="ring-element"></div>
          </div>
        </div>
      </div>
    </html>
  );
}

export default RegisterPage; // Exporting RegisterPage component

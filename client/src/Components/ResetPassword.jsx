// Import necessary functions and modules
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Config/firebase';
import { useState } from 'react';
import React from 'react'; // Import React
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import './Styles.css'; // Import CSS file for styling

// Function component to handle password reset
function ResetPassword() {
  const [email, setEmail] = useState(''); // State for email input

  // Function to handle password reset
  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email); // Send password reset email
      alert("Password reset email sent. Please check your email."); // Show alert for successful email sending
    } catch(err) {
      console.log(err); // Log any errors
    }
  }

  // Return JSX
  return (
    <html className='page'> {/* HTML page structure */}
      <div className='wrapper'> {/* Wrapper div */}
        <div> {/* Inner div */}
          <h1>Plot N' Plant</h1> {/* Heading */}
          <img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt="Plant" width="80px" /> {/* Plant icon */}
          <div> {/* Inner div for input and buttons */}
            <input type="email" className="reset-password-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br /> {/* Email input */}
            <button className="button" onClick={handleResetPassword}>Reset Password</button> {/* Button to reset password */}
            <Link to="/"> {/* Link to navigate back to login */}
              <button className="button">Back to Login</button> {/* Button to go back to login */}
            </Link>
          </div>
        </div>
      </div>
    </html>
  );
}

export default ResetPassword; // Export ResetPassword component

import React from "react"; // Importing React library
import "./Home.css"; // Importing CSS file for styling
import { Link } from "react-router-dom"; // Importing Link component from React Router
import { signOut } from "firebase/auth"; // Importing signOut method from Firebase authentication
import { auth } from "../Config/firebase"; // Importing auth object from Firebase configuration
import { useState } from "react"; // Importing useState hook from React
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from React Router

/**
 * Functional component representing the home page with navigation links and logout functionality.
 */
function Home() { // Declaring a functional component named Home
  // State variable to manage active state for split view
  const [active, setActive] = useState(""); // Declaring state variable 'active' and its updater function 'setActive' using useState hook
  const navigate = useNavigate(); // Accessing navigation functions from React Router

  /**
   * Logs out the current user.
   */
  const logout = async () => { // Defining a function logout to log out the current user
    try {
      await signOut(auth); // Signing out the user using Firebase authentication
    } catch (err) {
      console.error(err); // Logging error if logout fails
    }
  };

  return (
    <div>
      <div className="home-top-bar"> 
        <h1>Plot N' Plant</h1> 
        <div className="links"> 
          {/* Logout button */}
          <Link to="/"> 
            <button onClick={logout} className="btn logout-button"> 
              Logout 
            </button>
          </Link>
          {/* Settings button */}
          <Link to="/usersettings">
            <button className="btn settings-button"> 
              Settings
            </button>
          </Link>
        </div>
      </div>
      {/* Main content with split view */}
      <div className={`home-container ${active}`}> {/*Rendering a div with className 'home-container' and 'active' if state 'active' is true*/}
        {/* Left split with map link */}
        <div // Rendering a div for left split
          className="split left" // Setting className 'split left'
          onMouseEnter={() => setActive("active-left")} // Setting 'active-left' state when mouse enters
          onMouseLeave={() => setActive("")} // Removing 'active' state when mouse leaves
        >
          <h3>Map</h3> 
          {/* Map link */}
          <a href="/map" className="map-button"> 
            Click Here To View Map 
          </a>
        </div>
        {/* Right split with calendar link */}
        <div // Rendering a div for right split
          className="split right" // Setting className 'split right'
          onMouseEnter={() => setActive("active-right")} // Setting 'active-right' state when mouse enters
          onMouseLeave={() => setActive("")} // Removing 'active' state when mouse leaves
        >
          <h3>Calendar</h3> 
          {/* Calendar link */}
          <a href="/cal" className="calender-button"> 
            Click Here To View Calendar 
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home; // Exporting the Home component as the default export

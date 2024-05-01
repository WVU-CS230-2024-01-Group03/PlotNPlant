import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Functional component representing the home page with navigation links and logout functionality.
 */
function Home() {
  // State variable to manage active state for split view
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  /**
   * Logs out the current user.
   */
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
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
            <button className="btn settings-button">Settings</button>
          </Link>
        </div>
      </div>
      {/* Main content with split view */}
      <div className={`home-container ${active}`}>
        {/* Left split with map link */}
        <div
          className="split left"
          onMouseEnter={() => setActive("active-left")}
          onMouseLeave={() => setActive("")}
        >
          <h3>Map</h3>
          {/* Map link */}
          <a href="/map" className="map-button">
            Click Here To View Map
          </a>
        </div>
        {/* Right split with calendar link */}
        <div
          className="split right"
          onMouseEnter={() => setActive("active-right")}
          onMouseLeave={() => setActive("")}
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

export default Home;

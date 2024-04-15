import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
function Home() {
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
        <button onClick={logout} className="btn logout-button">
          Logout
        </button>
        <Link to="/usersettings">
          <button className="btn settings-button">Settings</button>
        </Link>
      </div>
      <div className="home-container">
        <div className="split left">
          <h2>Map</h2>
          <a href="/map" className="map-button">
            Click Here To View Map
          </a>
        </div>
        <div className="split right">
          <h2>Calender</h2>
          <a href="/cal" className="calender-button">
            Click Here To View Calender
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const [active, setActive] = useState("");
  const navigate = useNavigate();

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
          <Link to="/">
            <button onClick={logout} className="btn logout-button">
              Logout
            </button>
            </Link>
          <Link to="/usersettings">
            <button className="btn settings-button">Settings</button>
          </Link>
        </div>
      </div>
      <div className={`home-container ${active}`}>
        <div
          className="split left"
          onMouseEnter={() => setActive("active-left")}
          onMouseLeave={() => setActive("")}
        >
          <h3>Map</h3>
          <a href="/map" className="map-button">
            Click Here To View Map
          </a>
        </div>
        <div
          className="split right"
          onMouseEnter={() => setActive("active-right")}
          onMouseLeave={() => setActive("")}
        >
          <h3>Calendar</h3>
          <a href="/cal" className="calender-button">
            Click Here To View Calendar
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="image-container">
        {/* Container for Images */}
        <div className="map-img">
          <p className="image-text">Click the Map to enter map view</p>
          <img src="map.png" alt="map"></img>
        </div>
        <div className="calender-img">
          <p className="image-text">
            Click the Calender to enter calender view
          </p>
          {/* Link to Calender */}
          <Link to="/cal">
            <img src="calender.png" alt="calender"></img>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

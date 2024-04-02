import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import {auth} from "../Config/firebase";
import {signOut} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Home() {
  const navigate = useNavigate();

  const logout = async () => {
    try{
        await signOut(auth);
        navigate('/');
    }catch (err){
        console.error(err);
    }
  }

  return (
    <div>
      <div className="home-top-bar">
        <h1>Plot N' Plant</h1>
        <button onClick={logout} className="logout-button">Logout</button>
        <Link to="/usersettings">
          <button className="logout-button">Settings</button>
        </Link>
      </div>

      <div className="image-container">{/* Container for Images */}
        <div className="map-img">
        <p className="image-text">Click the Map to enter map view</p>
          <img src="map.png" alt="map"></img>
        </div>
        <div className="calender-img">
        <p className="image-text">Click the Calender to enter calender view</p>
          {/* Link to Calender */}
          <Link to="/cal">
          <img src="calender.png" alt="calender"></img>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home

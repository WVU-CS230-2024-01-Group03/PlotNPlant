import React from 'react';
import './SettingsPage.css';
import { FaUser, FaLock} from "react-icons/fa";
import { Link } from 'react-router-dom';


<h1>Settings</h1>
const SettingsPage = () => {
  return(
        <div class='wrapper_settingspage'>
        <h1>Settings</h1>
        {<img src="https://cdn1.iconfinder.com/data/icons/icons-for-a-site-1/64/advantage_eco_friendly-128.png" alt = "Plant" width="80px"></img> }
       
            <div className="Settings">
                <p></p><Link to="/">Back</Link>
            </div>
        </div>
  );
}


export default SettingsPage
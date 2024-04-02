import './Components/Styles.css';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import ResetPassword from './Components/ResetPassword';
import Home from './Components/Home';
import Auth from './Components/auth';
import Cal from './Components/Cal';
import Settings from './Components/Settings';
import UserSettings from './Components/UserSettings';
import * as React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <div className="App">
      <title>Plot N' Plant</title>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cal" element = {<Cal />} />
        <Route path="/settings" element = {<Settings />} />
        <Route path="/homepage" element = {<Home />} />
        <Route path="/usersettings" element = {<UserSettings />} />
        <Route path="/resetpassword" element = {<ResetPassword />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
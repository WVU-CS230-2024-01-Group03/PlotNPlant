import './Components/Styles.css';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import Auth from './Components/auth';
import Cal from './Components/Cal';
import Settings from './Components/Settings';
import * as React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <div className="App">
      <title>Plot N' Plant</title>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="cal" element = {<Cal />} />
        <Route path="settings" element = {<Settings />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

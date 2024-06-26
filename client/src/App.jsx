import "./Components/Styles.css";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import ResetPassword from "./Components/ResetPassword";
import Home from "./Components/Home";
import Cal from "./Components/Cal";
import UserSettings from "./Components/UserSettings";
import Map from "./Components/Map";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataParser from "./Components/tempdatatransfer";

function App() {
  return (
    <div className="App">
      <title>Plot N' Plant</title>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cal" element={<Cal />} />
          <Route path="/homepage" element={<Home />} />
          <Route path="/usersettings" element={<UserSettings />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

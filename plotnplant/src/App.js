// import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import Cal from './Components/Cal';
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
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

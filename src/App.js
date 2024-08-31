import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import AddRepairMan from "./components/AddRepairMan";
import HomePage from "./components/HomePage";

function App() {

  useEffect(() => {
    const token = localStorage.getItem("token");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/addrepairman"
            element={<HomePage/>}/>
          <Route 
            path="/register" 
            element={<Register />} />
          <Route
            path="/login"
            element={<Login/>}/>
            <Route
            path="/"
            element={<MainPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

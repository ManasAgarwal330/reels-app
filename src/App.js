import "./App.css";
import AuthProvider from "./Context/AuthContext";
import React from "react";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile.js";

function App() {
  return (
    <Router>
      <AuthProvider>
        <PrivateRoute />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/" element={<Feed />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

import "./App.css";
import AuthProvider from "./Context/AuthContext";
import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Feed from "./components/Feed";

function App() {
  return (
    <Router>
      <AuthProvider>
        <PrivateRoute />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Feed />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

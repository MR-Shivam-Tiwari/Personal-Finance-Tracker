import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home";
import Signup from "./Component/Auth/Signup";
import './index.css'

import Navbar from "./Component/Navbar";
import ContactUs from "./Component/ContactUs";
import Profile from "./Component/Profile/Profile";
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Auth/Login";



function App() {
  return (
    <div className="">
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

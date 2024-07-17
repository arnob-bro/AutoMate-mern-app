import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import axios from "axios";
import { logoutUser } from "../../api/auth";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      alert("Logout successful");
      localStorage.removeItem("userData");
    } catch (error) {
      console.error("Logout failed:", error);
      alert(error.toString());
    }
  };

  // Assuming userData contains the role and is stored in localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAdmin = userData ? userData.isAdmin : false;

  return (
    <div className="navbar">
      <div className="navLogo">
        {/* <h2>AM</h2> */}
        <h2>AutoMate</h2>
      </div>

      <ul className="navMenu">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/book-now"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Book Now
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/parts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Parts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about-us"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/history"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Purchase & Booking History
          </NavLink>
        </li>
        {isAdmin && (
          <li>
            <NavLink
              to="/admin-page"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Admin
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/"
            onClick={handleLogout}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

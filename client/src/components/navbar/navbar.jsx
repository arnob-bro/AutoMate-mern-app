import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { logoutUser } from "../../Api/auth";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
      alert(error.toString());
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".navDropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAdmin = userData ? userData.isAdmin : false;

  return (
    <div className={`navbar ${menuOpen ? "menu-open" : ""}`}>
      <div className="navLogo">
        <h2>AutoMate</h2>
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰
        </div>
      </div>

      <ul className={`navMenu ${menuOpen ? "show-menu" : ""}`}>
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
            to="/services"
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

        {/* Dropdown for History */}
        <li className="navDropdown" onClick={toggleDropdown}>
          <span className="dropdown-toggle">Purchase & Booking History</span>
          <ul
            className={`dropdown-menu ${dropdownOpen ? "show-dropdown" : ""}`}
          >
            <li>
              <NavLink
                to="/OrderHistory"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Order History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/service-history"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Service History
              </NavLink>
            </li>
          </ul>
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

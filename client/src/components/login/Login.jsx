import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCar,
  FaMotorcycle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, signup } from "../../Api/auth";
import "./Login.css";
import { color } from "chart.js/helpers";

export const Login = () => {
  const navigate = useNavigate();

  // pre-loggedIn check
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);

  if (userData) {
    console.log(userData);
    window.location.href = "/home";
  }

  const [action, setAction] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    vehicleType: "",
    vehicleBrand: "",
    vehicleModel: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(data);
      if (response === "Invalid email or password") {
        alert("Invalid email or password");
      } else {
        localStorage.setItem("userData", JSON.stringify(response));
        navigate("/home");
      }
    } catch (error) {
      alert("Some error has occurred. Please try again later");
      console.log(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(data);
      if (response === "choose your vehicle") {
        alert("Choose your vehicle");
      } else if (response === "User already Exists") {
        alert("User already Exists");
      } else if (response === "Username already Exists") {
        alert("Username already Exists");
      } else {
        localStorage.setItem("userData", JSON.stringify(response));
        navigate("/home");
      }
    } catch (error) {
      alert("Some error has occurred. Please try again later");
      console.log(error);
    }
  };

  return (
    <div className="LSP-loginpage">
      <div className="LSP-leftContainer">
        <h1>AutoMate</h1>
        <p>Your Reliable Partner for Vehicle Care</p>
      </div>
      <div className="LSP-container">
        {action === "Login" ? (
          <>
            <form onSubmit={handleLogin} className="LSP-inputs">
              <div className="LSP-input">
                <span className="LSP-Icon">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  placeholder="Email Id"
                  name="email"
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="LSP-input">
                <span className="LSP-Icon">
                  <FaLock />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="LSP-submit-container">
                <button type="submit" className="LSP-submit">
                  Login
                </button>
              </div>
            </form>

            <div className="LSP-underline"></div>
            <div className="LSP-submit-container">
              <div className="LSP-submit" onClick={() => setAction("Sign Up")}>
                Create New Account
              </div>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleSignUp}>
              <div className="LSP-inputs">
                <div className="LSP-input">
                  <span className="LSP-Icon">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="LSP-input">
                  <span className="LSP-Icon">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    placeholder="Email Id"
                    name="email"
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="LSP-input">
                  <span className="LSP-Icon">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={changeHandler}
                    required
                  />
                </div>
              </div>

              <div className="LSP-vehicleOption">
                <div className="LSP-vehicleTitle">Choose Your Vehicle:</div>
                <div style={{ color: "black" }} className="LSP-vehicles">
                  <div>
                    <input
                      type="radio"
                      id="Car"
                      name="vehicleType"
                      value="Car"
                      onChange={changeHandler}
                    />
                    <label htmlFor="Car">Car</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Bike"
                      name="vehicleType"
                      value="Bike"
                      onChange={changeHandler}
                    />
                    <label htmlFor="Bike">Bike</label>
                  </div>
                </div>
              </div>

              <div className="LSP-input">
                <span className="LSP-Icon">
                  <FaCar />
                </span>
                <input
                  type="text"
                  placeholder="Brand"
                  name="vehicleBrand"
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="LSP-input">
                <span className="LSP-Icon">
                  <FaMotorcycle />
                </span>
                <input
                  type="text"
                  placeholder="Model"
                  name="vehicleModel"
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="LSP-submit-container">
                <button
                  type="submit"
                  className="LSP-submit"
                  onSubmit={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="LSP-existing-account">
              Already have an account?{" "}
              <span className="login-link" onClick={() => setAction("Login")}>
                Login
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

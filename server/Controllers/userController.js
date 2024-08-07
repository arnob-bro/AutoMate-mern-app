const express = require("express");
const userModel = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../Config/generateToken");

//login controller for logging in
const loginController = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  //console.log("fetched user data");

  if (user && (await user.matchPassword(password))) {
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      refreshToken: generateRefreshToken(user._id),
      accessToken: generateAccessToken(user._id),
    };
    //console.log(response);
    //console.log("user exists");
    res.json(response);
  } else {
    res.json("Invalid email or password");
    throw new Error("Invalid email or password");
  }
});

//register controller for signing up
const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password, vehicleType, vehicleBrand, vehicleModel } =
    req.body;

  //check for all fields to be filled
  if (
    !name ||
    !email ||
    !password ||
    !vehicleType ||
    !vehicleBrand ||
    !vehicleModel
  ) {
    //res.send(400);
    res.json("choose your vehicle");
    throw Error("All necessary input fields have no been filled");
  }

  //check for pre existing user
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    res.json("User already Exists");
    throw new Error("User already Exists");
  }

  //username already taken
  const userNameTaken = await userModel.findOne({ name });
  if (userNameTaken) {
    res.json("Username already Exists");
    throw new Error("Username has been taken");
  }

  //create an entry in the database
  const user = await userModel.create({
    name,
    email,
    password,
    vehicleType,
    vehicleBrand,
    vehicleModel,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      refreshToken: generateRefreshToken(user._id),
      accessToken: generateAccessToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Registration Error");
  }
});

//logout controller for logging out
const logoutController = expressAsyncHandler(async (req, res) => {
  res.json({ message: "Logout successful" });
});

module.exports = { loginController, registerController, logoutController };

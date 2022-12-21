const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Get All Users
const getUsers = async (req, res) => {
  res.status(200).json(await User.find({}));
};

// Register New User
const registerUser = async (req, res) => {
  const user = await User.create({ admin: false });
  res.status(201).json(user);
};

// Logeddin User
const loginUser = async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({ _id: req.body.id });

  const token = jwt.sign(
    {
      _id: user._id
    },
    process.env.SECRET_TOKEN_KEY,
    {
      expiresIn: "3h"
    }
  );

  res.status(200).json({ token });
};

module.exports = { getUsers, registerUser, loginUser };

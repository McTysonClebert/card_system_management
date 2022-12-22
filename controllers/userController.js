import validator from "validator";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Register New User
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (await User.findOne({ username })) {
    return res.status(403).json({ error: "Username already in use" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password is not strong enough" });
  }

  const hashPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ username, password: hashPassword, role });

  const token = jwt.sign(
    {
      _id: user._id
    },
    process.env.SECRET_TOKEN_KEY,
    {
      expiresIn: "3h"
    }
  );

  res.status(201).json({ username: user.username, role: user.role, token });
};

// Logeddin User
const loginUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "Username not found" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Password is not valid" });
  }

  if (user.role !== "admin" && user.role !== role) {
    return res
      .status(403)
      .json({ error: "You are not allowed to connect as admin" });
  }

  const token = jwt.sign(
    {
      _id: user._id
    },
    process.env.SECRET_TOKEN_KEY,
    {
      expiresIn: "3h"
    }
  );

  res.status(201).json({ username: user.username, role: user.role, token });
};

export { registerUser, loginUser };

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

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (oldPassword === newPassword) {
    return res.status(400).json({
      error: "You're new password must be different from the previous password"
    });
  }

  const userExiste = await User.findOne({ _id: req.user._id });

  if (!userExiste) {
    return res.status(400).json({ error: "User does not exist" });
  }

  if (!(await bcrypt.compare(oldPassword, userExiste.password))) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  if (!validator.isStrongPassword(newPassword)) {
    return res
      .status(400)
      .json({ error: "The new password is not strong enough" });
  }

  const hashPassword = await bcrypt.hash(newPassword, 12);

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { password: hashPassword },
    { new: true }
  );

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

export { registerUser, loginUser, updateUserPassword };

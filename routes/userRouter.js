const express = require("express");

const {
  getUsers,
  loginUser,
  registerUser
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/").get(getUsers);
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

module.exports = userRouter;

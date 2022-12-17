import express from "express";
import {
  getUsers,
  loginUser,
  registerUser
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/").get(getUsers);
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

export default userRouter;

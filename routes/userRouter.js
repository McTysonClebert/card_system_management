import express from "express";

import {
  registerUser,
  loginUser,
  updateUserPassword
} from "../controllers/userController.js";
import { authMiddleWare } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/password").patch(authMiddleWare, updateUserPassword);

export default userRouter;

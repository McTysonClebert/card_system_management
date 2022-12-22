import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);

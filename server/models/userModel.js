import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    admin: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);

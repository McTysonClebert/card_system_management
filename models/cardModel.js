import mongoose, { Schema } from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    price: { type: Number, required: true },
    number: { type: Number, required: true },
    members: { type: Array, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("card", cardSchema);

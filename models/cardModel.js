import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    number: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("card", cardSchema);

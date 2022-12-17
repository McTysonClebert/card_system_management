import mongoose, { Schema } from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    price: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "users", required: true },
    members: { type: Array, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("card", cardSchema);

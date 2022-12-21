const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    price: { type: Number, required: true },
    number: { type: Number, required: true },
    members: { type: Array, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("card", cardSchema);

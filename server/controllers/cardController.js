import mongoose from "mongoose";
import Card from "../models/cardModel.js";

// Create New Card
const createCard = async (req, res) => {
  const { type, members } = req.body;

  let number;

  do {
    number = Math.round(Math.random() * (99999 - 10000)) + 10000;
  } while (await Card.exists({ number }));

  if (!["vip", "standard", "family"].includes(type)) {
    return res.status(400).json({ error: "Invalid type of card" });
  }

  if (
    !(members.length > 0) ||
    members.filter((member) => member !== "").length <= 0
  ) {
    return res
      .status(400)
      .json({ error: "You must provide at least one member to create a card" });
  }

  if (type === "vip" && members.length > 1) {
    return res
      .status(400)
      .json({ error: "A vip card can't be used for more than one member" });
  }

  if (type === "standard" && members.length > 1) {
    return res.status(400).json({
      error: "A standard card can't be used for more than one member"
    });
  }

  let price = type === "family" ? 2500 : type === "standard" ? 1500 : 0;

  const card = await Card.create({
    type,
    price,
    number,
    members
  });

  res.status(201).json(card);
};

// Get All Cards
const getCards = async (req, res) => {
  const cards = await Card.find({});
  res.status(200).json(cards);
};

// Get A Card
const getCard = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).json({ error: "Invalid card id" });
  }

  const card = await Card.findOne({ _id });

  if (!card) {
    return res.status(400).json({ error: "Card does not exist" });
  }

  res.status(202).json(card);
};

// TODO: Update A Card
const updatedCard = async (req, res) => {
  const { id: _id } = req.params;
  const { type, price, members } = req.body;

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).json({ error: "Invalid card id" });
  }

  const cardExists = await Card.exists({ _id });

  if (!cardExists) {
    return res.status(400).json({ error: "Card does not exist" });
  }

  if (!(members.length > 0)) {
    return res
      .status(400)
      .json({ error: "You must provide at least one member to update a card" });
  }

  if (type !== null && type === "vip" && members.length > 1) {
    return res
      .status(400)
      .json({ error: "A vip card can't be used for more than one member" });
  }

  if (type !== null && type === "standard" && members.length > 1) {
    return res.status(400).json({
      error: "A standard card can't be used for more than one member"
    });
  }

  switch (type) {
    case "standard":
      price = 1500;
      break;
    case "family":
      price = 2500;
      break;
    default:
      price = 0;
      break;
  }

  const card = await Card.findOneAndUpdate(
    { _id: id },
    {
      code: Date.now(),
      type,
      members,
      price
    },
    { new: true }
  );

  if (!card) {
    return res.status(500).json({ error: "Card could not be created" });
  }

  res.status(201).json(card);
};

// Delete A Card
const deletedCard = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).json({ error: "Invalid card id" });
  }

  const cardId = await Card.findOneAndDelete({ _id }).select({ _id });

  if (!cardId) {
    return res.status(400).json({ error: "Card does not exist" });
  }

  res.status(202).json(cardId);
};

export { createCard, getCards, getCard, updatedCard, deletedCard };

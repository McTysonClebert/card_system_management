import mongoose from "mongoose";
import Card from "../models/cardModel.js";

// Create New Card
const createCard = async (req, res) => {
  const { type, name } = req.body;

  if (!["vip", "standard", "family"].includes(type)) {
    return res.status(400).json({ error: "Invalid type of card" });
  }

  if (!(name.length > 0)) {
    return res
      .status(400)
      .json({ error: "You must provide at least one member to create a card" });
  }

  const card = await Card.create({
    name,
    type,
    price: type === "standard" ? 1500 : type === "family" ? 2500 : 0,
    number: await getRandomNumber()
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

const verifyCard = async (req, res) => {
  const { id: _id } = req.params;
  const { number } = req.body;

  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).json({ error: "Invalid card id" });
  }

  const card = await Card.findOne({ _id, number });

  if (!card) {
    return res.status(400).json({ error: "Invalid card id or number" });
  }

  res.status(202).json({ card, verified: true });
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

const getRandomNumber = async () => {
  let number;

  do {
    number = Math.round(Math.random() * (99999 - 10000)) + 10000;
  } while (await Card.exists({ number }));

  return number;
};

export { createCard, getCards, getCard, verifyCard, deletedCard };

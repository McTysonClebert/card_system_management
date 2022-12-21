const express = require("express");
const {
  createCard,
  getCards,
  getCard,
  updatedCard,
  deletedCard
} = require("../controllers/cardController");
// import { authMiddleWare } from "../middlewares/authMiddleware.js";

const cardRouter = express.Router();

// cardRouter.use(authMiddleWare);
cardRouter.route("/").get(getCards).post(createCard);
cardRouter.route("/:id").get(getCard).patch(updatedCard).delete(deletedCard);

module.exports = cardRouter;

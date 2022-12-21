import express from "express";

import {
  createCard,
  getCards,
  getCard,
  updatedCard,
  deletedCard
} from "../controllers/cardController.js";

const cardRouter = express.Router();

cardRouter.route("/").get(getCards).post(createCard);
cardRouter.route("/:id").get(getCard).patch(updatedCard).delete(deletedCard);

export default cardRouter;

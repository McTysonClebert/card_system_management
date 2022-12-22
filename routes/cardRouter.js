import express from "express";

import {
  createCard,
  getCards,
  getCard,
  verifyCard,
  deletedCard
} from "../controllers/cardController.js";

const cardRouter = express.Router();

cardRouter.route("/").get(getCards).post(createCard);
cardRouter.route("/:id").get(getCard).delete(deletedCard).post(verifyCard);

export default cardRouter;

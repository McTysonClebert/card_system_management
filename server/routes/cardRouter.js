import express from "express";
import {
  createCard,
  getCards,
  getCard,
  updatedCard,
  deletedCard
} from "../controllers/cardController.js";
// import { authMiddleWare } from "../middlewares/authMiddleware.js";

const cardRouter = express.Router();

// cardRouter.use(authMiddleWare);
cardRouter.route("/").get(getCards).post(createCard);
cardRouter.route("/:id").get(getCard).patch(updatedCard).delete(deletedCard);

export default cardRouter;

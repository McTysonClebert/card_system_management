// import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cardRouter from "./routes/cardRouter.js";

const { log } = console;
const uri = process.env.DATABASE_URI;
const app = express();

// Applying middlewares to the application
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Set the routes of the application
app.use("/api/v1/cards", cardRouter);

// Connect to the database and start the server of the application
mongoose
  .connect(uri)
  .then(() => {
    log("Database connection established successfully");

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    log(error);
  });

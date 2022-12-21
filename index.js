// import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cardRouter from "./routes/cardRouter.js";
import userRouter from "./routes/userRouter.js";

const {
  PORT: port,
  DEV_DATABASE_URI: devUri,
  PROD_DATABASE_URI: prodUri,
  NODE_ENV: nodeEnv
} = process.env;

const uri = nodeEnv === "development" ? devUri : prodUri;
const { log } = console;
const app = express();

// Applying middlewares to the application
app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Set the routes of the application
app.use("/api/v1/cards", cardRouter);
app.use("/api/v1/users", userRouter);

// Connect to the database and start the server of the application
mongoose.set("strictQuery", false);
mongoose
  .connect(uri)
  .then(() => {
    app.listen(port || 3000, () => {
      log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    log(error);
  });

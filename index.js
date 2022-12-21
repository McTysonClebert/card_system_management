require("dotenv/config");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const {
  PORT: port,
  DEV_DATABASE_URI: devUri,
  PROD_DATABASE_URI: prodUri,
  NODE_ENV: nodeEnv
} = process.env;

const uri = nodeEnv === "development" ? devUri : prodUri;

const { log } = console;
// const port = process.env.PORT;
// const uri = process.env.DEV_DATABASE_URI;
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
app.use("/api/v1/cards", require("./routes/cardRouter.js"));
app.use("/api/v1/users", require("./routes/userRouter.js"));

// Connect to the database and start the server of the application
mongoose.set("strictQuery", false);
mongoose
  .connect(uri)
  .then(() => {
    app.listen(port || 8000, () => {
      log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    log(error);
  });

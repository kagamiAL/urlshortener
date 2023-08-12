require("express-async-errors");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const urlRouter = require("./controllers/shortenedURLRouter");
const mainRouter = require("./controllers/mainRouter");
const app = express();
const config = require("./utils/config");

mongoose.set("strictQuery", false);

logger.info("Connecting to Mongo DB URL:", config.MONGO_DB_URL);

mongoose
  .connect(config.MONGO_DB_URL)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("Failed to connect to MongoDB error:", err));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/shortenedurls", urlRouter);
app.use("/", mainRouter);

app.use(express.static("build"));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

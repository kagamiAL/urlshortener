const urlRouter = require("express").Router();
const shorturlUtil = require("../utils/shorturl");
const shortenedURL = require("../models/shortenedURL");
const ShortenedURL = require("../models/shortenedURL");

//<FOR TESTING, will be commented out in production
if (process.env.NODE_ENV === "development") {
  urlRouter.get("/", async (req, res) => {
    const shortenedURLs = await ShortenedURL.find({});
    res.status(200).json(shortenedURLs);
  });
}

urlRouter.post("/", async (req, res) => {
  const existingURL = await ShortenedURL.findOne({
    originalURL: req.body.originalURL,
  });
  if (existingURL) {
    res.status(200).json(existingURL);
    return;
  }
  const allURLs = await shortenedURL.find({});
  const newURLObject = new ShortenedURL({
    originalURL: req.body.originalURL,
    shortURL: shorturlUtil.generateRandomShortURL(
      allURLs.map((urlObject) => urlObject.shortURL)
    ),
  });
  await newURLObject.save();
  res.status(201).json(newURLObject);
});

module.exports = urlRouter;

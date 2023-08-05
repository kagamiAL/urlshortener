const mainRouter = require("express").Router();
const ShortenedURL = require("../models/shortenedURL");

mainRouter.get("/:shortURL", async (req, res) => {
  const shortURL = req.params.shortURL;
  const shortenedURL = await ShortenedURL.findOne({ shortURL });
  if (shortenedURL) {
    res.redirect(shortenedURL.originalURL);
  } else {
    res.status(404).send("URL not found");
  }
});

module.exports = mainRouter;

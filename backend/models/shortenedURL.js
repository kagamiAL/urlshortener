const mongoose = require("mongoose");
const is_valid_http_url = require("is-url-http");

const ShortenedURLSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: [true, "Original URL not provided"],
    validate: {
      validator: function (v) {
        return is_valid_http_url(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  shortURL: String,
});

ShortenedURLSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("ShortenedURL", ShortenedURLSchema);

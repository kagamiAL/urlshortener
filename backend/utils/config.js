require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_DB_URL:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_MONGO_DB_URL
      : process.env.MONGO_DB_URL,
};

const URL_LENGTH = 8;

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$-_.+!*'()";

const generateRandomShortURL = (currentURLs) => {
  let stringReturn = null;
  while (!stringReturn || currentURLs.includes(stringReturn)) {
    stringReturn = "";
    for (let x = 0; x < URL_LENGTH; x++) {
      stringReturn += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
  }
  return stringReturn;
};

module.exports = {
  generateRandomShortURL,
};

const supertest = require("supertest");
const app = require("../App");
const mongoose = require("mongoose");
const ShortenedURL = require("../models/shortenedURL");

const api = supertest(app);

beforeEach(async () => {
  await ShortenedURL.deleteMany({});
  let shortURL = new ShortenedURL({
    originalURL:
      "https://www.freecodecamp.org/news/how-to-validate-urls-in-javascript/#how-to-use-npm-packages-to-validate-urls",
  });
  await shortURL.save();
});

describe("Post requests to shorttURL", () => {
  test("Existing url in database returns its shortened url", async () => {
    let urlObject = ShortenedURL.findOne({
      originalURL:
        "https://www.freecodecamp.org/news/how-to-validate-urls-in-javascript/#how-to-use-npm-packages-to-validate-urls",
    });
    let response = await api.post("/api/shortenedurls").send({
      originalURL:
        "https://www.freecodecamp.org/news/how-to-validate-urls-in-javascript/#how-to-use-npm-packages-to-validate-urls",
    });
    expect(response.body.shortURL).toBe(urlObject.shortURL);
  });
  test("Non existent URL returns error status 400", async () => {
    await api.post("/api/shortenedurls").send({}).expect(400);
  });
  test("Invalid url returns error status 400", async () => {
    await api
      .post("/api/shortenedurls")
      .send({ originalURL: "el;aijfeel.com" })
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

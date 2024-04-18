const app = require("../src/server.js");
const request = require("supertest");
require("dotenv").config();

let server;
const PORT = process.env.PORT;

beforeAll((done) => {
  server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

test("should return hello world", async () => {
  const response = await request(app).get("/");

  expect(response.text).toBe("Hello World");
});

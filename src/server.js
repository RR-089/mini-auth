const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const morgan = require("morgan");
const passport = require("passport");
require("dotenv").config();

const connectDB = require("./db/mongodb.connection.js");
const sessionConfig = require("./config/session.config.js");
const customMorganMiddleware = require("./middlewares/morgan.logger.js");

const routes = require("./routes/v1/index.js");

const app = express();
const PORT = process.env.PORT;

connectDB(process.env.MONGODB_URI);
app.use(express.json());
app.use(customMorganMiddleware);
app.use(morgan("tiny"));
app.use(helmet());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.all("*", (req, res) => {
  res
    .status(404)
    .send(`Cannot find route: ${req.url} for method: ${req.method}`);
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}

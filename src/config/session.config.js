const MongoStore = require("connect-mongo");
require("dotenv").config();

const sessionConfig = {
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 30 },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    autoRemove: "native",
  }),
};

module.exports = sessionConfig;

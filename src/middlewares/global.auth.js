const { internalError } = require("../handlers/error.handler");

const globalAuth = (req, res, next) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: "you are not authenticated" });

    next();
  } catch (error) {
    internalError(error, res);
  }
};

module.exports = globalAuth;

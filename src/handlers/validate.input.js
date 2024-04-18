const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const valResult = validationResult(req);

  if (!valResult.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Bad request", errors: valResult.array() });
  }

  next();
};

module.exports = validate;

const validate = require("../handlers/validate.input");

const validateErrors = (req, res, next) => {
  validate(req, res, next);
};

module.exports = validateErrors;

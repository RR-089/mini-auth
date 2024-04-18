const { body, param, query } = require("express-validator");

const userValidation = {
  createUser: [
    body("username")
      .notEmpty()
      .withMessage("username tidak boleh kosong")
      .isString()
      .withMessage("username harus bertipe string"),
    body("password")
      .notEmpty()
      .withMessage("password tidak boleh kosong")
      .isString()
      .withMessage("password harus bertipe string"),
    body("email")
      .isEmail()
      .withMessage("harap masukkan format email yang benar")
      .optional(),
  ],
  getAllUsers: [
    query("username")
      .isString()
      .withMessage("query parameter pada username field harus bertipe string")
      .escape()
      .optional(),
  ],
  getOneUser: [
    param("id")
      .notEmpty()
      .withMessage("url parameter untuk id tidak boleh kosong")
      .isMongoId()
      .withMessage("harap masukkan id yang benar"),
  ],
  updateUser: [
    param("id")
      .notEmpty()
      .withMessage("url parameter untuk id tidak boleh kosong")
      .isMongoId()
      .withMessage("harap masukkan id yang benar"),
    body("username")
      .isString()
      .withMessage("username harus bertipe string")
      .optional(),
    body("password")
      .isString()
      .withMessage("password harus bertipe string")
      .optional(),
    body("email")
      .isEmail()
      .withMessage("harap masukkan format email yang benar")
      .optional(),
  ],
  deleteUser: [
    param("id")
      .notEmpty()
      .withMessage("url parameter untuk id tidak boleh kosong")
      .isMongoId()
      .withMessage("harap masukkan id yang benar"),
  ],
};

module.exports = userValidation;

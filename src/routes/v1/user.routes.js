const { Router } = require("express");
const userController = require("./../../controllers/user.controller.js");
const userValidation = require("./../../middlewares/user.validator.js");
const validateErrors = require("./../../middlewares/validate.errors.js");

const router = Router();

router.get(
  "/",
  userValidation.getAllUsers,
  validateErrors,
  userController.getAllUsers
);

router.get(
  "/:id",
  userValidation.getOneUser,
  validateErrors,
  userController.getOneUserById
);

router.post(
  "/",
  userValidation.createUser,
  validateErrors,
  userController.createUser
);

router.patch(
  "/:id",
  userValidation.updateUser,
  validateErrors,
  userController.updateUser
);

router.delete(
  "/:id",
  userValidation.deleteUser,
  validateErrors,
  userController.deleteUser
);

module.exports = router;

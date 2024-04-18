const { Router } = require("express");
const passport = require("passport");
const authController = require("./../../controllers/auth.controller.js");
require("./../../middlewares/user.auth.js");

const router = Router();

router.post("/login", passport.authenticate("local"), authController.login);
router.post("/logout", authController.logout);

module.exports = router;

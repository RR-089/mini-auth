const { Router } = require("express");
const globalAuth = require("../../middlewares/global.auth.js");

const userRouter = require("./user.routes.js");
const authRouter = require("./auth.routes.js");

const router = Router();
router.use("/api/v1/users", globalAuth, userRouter);
router.use("/api/v1/auth", authRouter);

module.exports = router;

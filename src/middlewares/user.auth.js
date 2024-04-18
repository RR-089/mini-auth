const passport = require("passport");
const { Strategy } = require("passport-local");
const { comparePasswords } = require("../handlers/password.handler.js");
const UserModel = require("./../models/user.model.js");

passport.serializeUser((user, done) => {
  done(null, user.username);
});
passport.deserializeUser(async (username, done) => {
  try {
    const findUser = await UserModel.find({ username });

    if (!findUser) throw new Error("user not found");
    done(null, { user: username });
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await UserModel.findOne({ username });

      if (!findUser) throw new Error("user not found");

      const isPasswordCorrect = await comparePasswords(
        password,
        findUser.password
      );
      if (!isPasswordCorrect) throw new Error("incorrect password");

      done(null, findUser);
    } catch (error) {
      console.error(error);

      done(error, null);
    }
  })
);

module.exports = passport;

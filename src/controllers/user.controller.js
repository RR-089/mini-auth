const UserModel = require("./../models/user.model.js");
const errorHandler = require("./../handlers/error.handler.js");
const { matchedData } = require("express-validator");
const {
  hashPassword,
  comparePasswords,
} = require("../handlers/password.handler.js");

const getAllUsers = async (req, res) => {
  try {
    const { username } = matchedData(req);

    if (username) {
      const regex = new RegExp(username, "i");
      const allUsersByUsername = await UserModel.find({
        username: { $regex: regex },
      });

      return res.json(allUsersByUsername);
    }

    const allUsers = await UserModel.find({});
    res.json(allUsers);
  } catch (error) {
    errorHandler.internalError(error, res);
  }
};

const getOneUserById = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const userById = await UserModel.findById(id);

    if (!userById) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(userById);
  } catch (error) {
    errorHandler.internalError(error, res);
  }
};
const createUser = async (req, res) => {
  try {
    const { username, password, email } = matchedData(req);
    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email: email || "",
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    errorHandler.internalError(error, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, username, password, email } = matchedData(req);
    let hashedNewPassword;

    const findUser = await UserModel.findById(id);
    if (!findUser) return res.status(404).json({ message: "user not found" });

    if (password) {
      const isCorrectUser = await UserModel.findOne({
        username: req.user.user,
      });
      if (isCorrectUser.username !== findUser.username)
        return res
          .status(403)
          .json({ message: "you are not allowed update this password" });

      const isSamePassword = await comparePasswords(
        password,
        isCorrectUser.password
      );
      if (isSamePassword)
        return res.status(403).json({
          message: "cannot update password to the same as the old one",
        });

      hashedNewPassword = await hashPassword(password);
    }

    await UserModel.findByIdAndUpdate(id, {
      ...(username && { username }),
      ...(hashedNewPassword && { password: hashedNewPassword }),
      ...(email && { email }),
    });

    res.json({ message: "user updated" });
  } catch (error) {
    errorHandler.internalError(error, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const deleteUser = await UserModel.findByIdAndDelete(id);

    if (!deleteUser) return res.status(404).json({ message: "user not found" });
    res.json(deleteUser);
  } catch (error) {
    errorHandler.internalError(error, res);
  }
};

module.exports = {
  getAllUsers,
  getOneUserById,
  createUser,
  updateUser,
  deleteUser,
};

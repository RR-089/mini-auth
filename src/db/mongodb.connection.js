const mongoose = require("mongoose");

const connectDB = async (MONGODB_URI) => {
  await mongoose.connect(MONGODB_URI).then(() => console.log("DB Connected"));
};

module.exports = connectDB;

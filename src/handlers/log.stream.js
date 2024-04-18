const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "../log/server.stream.log");

const accessLogStream = fs.createWriteStream(logPath, { flags: "a" });

module.exports = accessLogStream;

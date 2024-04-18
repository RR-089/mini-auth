const morgan = require("morgan");
const accessLogStream = require("../handlers/log.stream.js");
const moment = require("moment-timezone");

const format =
  ':remote-addr [:date[Asia/Jakarta]] ":method :url HTTP/:http-version"' +
  ':status :res[content-length] ":referrer" ' +
  '":user-agent" - ":response-time ms"';

morgan.token("date", (req, res, tz) => {
  return moment().tz(tz).format();
});

const morganMiddleware = morgan(format, { stream: accessLogStream });

module.exports = morganMiddleware;

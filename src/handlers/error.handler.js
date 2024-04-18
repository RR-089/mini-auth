const internalError = (error, res) => {
  console.error(error);
  res
    .status(500)
    .json({ message: "Server sedang bermasalah, coba lagi nanti" });
};

module.exports = { internalError };

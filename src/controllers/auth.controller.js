const login = (req, res) => {
  res.status(200).json({ message: "you are log in" });
};

const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Error destroying session:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.clearCookie("connect.sid");

    res.json({ message: "You are logged out" });
  });
};

module.exports = { login, logout };

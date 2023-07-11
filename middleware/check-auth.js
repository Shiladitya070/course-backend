const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config");
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, jwtKey);
        req.user = user;

        next();
      } catch (error) {
        return res.status(403).json({ msg: "Incorrect token", error });
      }
    } else {
      return res.status(403).json({
        error: "Authentication token must be in 'Bearer [token]' format",
      });
    }
  } else {
    return res.status(403).json({ error: "No authentication header found" });
  }
};

module.exports = { auth };

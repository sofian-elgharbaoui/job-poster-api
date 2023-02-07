const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("../errors");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authentication;
  if (!authHeader) throw new AuthenticationError("Please, try to login first.");
  const token = authHeader.split(" ")[1];
  const verificateToken = jwt.verify(token, process.env.SECRETE_KEY);
  req.verify = verificateToken;
  next();
};

module.exports = authMiddleware;

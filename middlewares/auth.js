// const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Please, try to register/login first.");
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const user = User.findById(payload.id).select("_id name");
    // req.user = user;
    req.user = { id: payload.id, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Please, try to register/login first.");
  }
};

module.exports = authMiddleware;

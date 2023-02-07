require("dotenv").config();
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

const register = async (req, res) => {
  // step 1
  // create the user | the validation is here in the schema
  let user = await User.create(req.body);
  let payload = { name: user.name, password: user.password };

  const token = jwt.sign(payload, process.env.SECRETE_KEY, {
    expiresIn: "10d",
  });

  let userInfo = { name: user.name, email: user.email };
  res.status(StatusCodes.CREATED).json({ userInfo, token });
};

const getUserInfo = async (req, res) => {
  const userID = req.params.id;
  const userInfo = await User.findById(userID).select("name email");
  res.status(StatusCodes.OK).json({ userInfo, verificateToken });
};

const updateData = async (req, res) => {
  const userID = req.params.id;
  const user = await User.findByIdAndUpdate(userID, req.body, {
    new: true,
    runValidators: true,
  }).select("name email");
  res.status(StatusCodes.OK).json(user);
};

const deleteUser = async (req, res) => {
  const userID = req.params.id;
  const user = await User.findByIdAndDelete(userID);
  res.status(StatusCodes.OK).json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email, password });

  let payload = { name: user.name, password: user.password };
  const token = jwt.sign(payload, process.env.SECRETE_KEY, {
    expiresIn: "10d",
  });

  let userInfo = { name: user.name, email: user.email };
  res.status(StatusCodes.CREATED).json({ userInfo, token });
};

module.exports = {
  register,
  getUserInfo,
  updateData,
  deleteUser,
  login,
};

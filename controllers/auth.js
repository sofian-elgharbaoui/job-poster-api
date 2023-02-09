const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  // step 1
  // create the user | the validation is here in the schema
  const user = await User.create(req.body);

  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ name: user.name, id: user._id, token });
};

const getUserInfo = async (req, res) => {
  const userID = req.params.id;
  // if I don't wanna select a key use: select("-password")
  const user = await User.findById(userID).select("name email");
  if (!user) {
    throw new BadRequestError(`there is no user with this id: ${userID}`);
  }
  res.status(StatusCodes.OK).json(user);
};

const updateData = async (req, res) => {
  const userID = req.params.id;
  if (req.body.name) {
    req.body.name = req.body.name.toLowerCase();
  }
  const user = await User.findByIdAndUpdate(userID, req.body, {
    new: true,
    runValidators: true,
  }).select("name email");
  if (!user) {
    throw new BadRequestError(`there is no user with this id: ${userID}`);
  }
  res.status(StatusCodes.OK).json(user);
};

const deleteUser = async (req, res) => {
  const userID = req.params.id;
  const user = await User.findByIdAndDelete(userID);
  if (!user) {
    throw new BadRequestError(`there is no user with this id: ${userID}`);
  }
  res.status(StatusCodes.OK).json(user);
};

const login = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide both your email and password");
  }

  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("You have passed the wrong email");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("You have passed the wrong password");
  }

  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ name: user.name, id: user._id, token });
};

module.exports = {
  register,
  getUserInfo,
  updateData,
  deleteUser,
  login,
};

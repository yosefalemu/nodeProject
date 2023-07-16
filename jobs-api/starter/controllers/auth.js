const UserSchema = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await UserSchema.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await UserSchema.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("invalid user");
  }
  const isPsswordMatch = await user.comparePassword(password);
  if (!isPsswordMatch) {
    throw new UnauthenticatedError("password incorrect");
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { userId: user._id, name: user.name }, token });
};

module.exports = { register, login };

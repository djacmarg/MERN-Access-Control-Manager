/*
This user middleware is used to validate ObjectID of mongo records of users
Its used as middleware to validate and to reset users token when a user request a password change
during password reset link request and eventual password reset
*/
const { isValidObjectId } = require("mongoose");
const ResetToken = require("../models/resetToken");
const { invokeError } = require("../utils/helpers");
const User = require("./../models/User");

exports.isResetTokenValid = async (req, res, next) => {
  const { token, id } = req.query;
  if (!token || !id) return invokeError(res, "Invalid request");

  if (!isValidObjectId(id)) return invokeError(res, "invalid user!");

  const user = await User.findById(id);
  if (!user) return invokeError(res, "User not found");

  const resetToken = await ResetToken.findOne({ owner: user._id });
  if (!resetToken) return invokeError(res, "Reset token not found!");

  const isValid = await resetToken.validateToken(token);
  if (!isValid) return invokeError(res, "Reset token not valid!");
  req.user = user;
  next();
};

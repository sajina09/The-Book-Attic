const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    new ErrorHandler(401, "Error", "Please login to access the token", null);
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  /*    storing the Id of user when it is logged in
    Can access the id from req.user as long as it is logged in */

  req.user = await User.findById(decodedData.id);
  next();
});

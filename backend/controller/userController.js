const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const { findById } = require("../model/userModel");

/* Register a User */
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is public id",
      url: "This is url",
    },
  });

  sendToken(user, 200, res);
});

/* Login user */
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, "Please provide email and password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler(401, "Invalid password"));
  }
  sendToken(user, 200, res);
});

/* Logout a user */

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    code: 200,
    message: "Logout successful",
    error: null,
    data: "Logged out",
  });
});

/* Forgot Password */
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = ` Your password reset token is :-n \n\n ${resetPasswordUrl} \n\n If you have not made this request , please ignore this mail , \n\n
  Have a great day `;

  try {
    await sendEmail(console.log("sendEmail"), {
      email: user.email,
      subject: `The-Book-Attic password recovery`,
      message,
    });

    res.status(200).json({
      code: 200,
      data: `Email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    console.log("error catch 2");

    return next(new ErrorHandler(message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Hashing and adding resetPasswordToken to userSchema
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetpasswordToken,
    resetpasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  user.password = req.body.password;
  user.resetPassword = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

/* Get user details */

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

/* update user password */
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await user.comparePassword(req.body.oldPassword);
  if (!isMatch) {
    return next(new ErrorHandler(401, "Old password is incorrect"));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler(401, "Passwords don't match"));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

/* Update profile of user */
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.body.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

/* Get all user details for admin */
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user,
  });
});

/* Get single user details for admin */
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return new ErrorHandler(`User doesn't exists with id : ${req.params.id}`);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

/* Update role of user -Admin */
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: `User role updated successfully to ${req.body.role}`,
  });
});

/* Delete  user  - Admin */
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id);

  if (!user) {
    return new ErrorHandler(
      400,
      `User doesn't exists with id : ${req.params.id}`
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: `User deleted successfully`,
  });
});

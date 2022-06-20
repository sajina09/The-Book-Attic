const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

/* Register a User */
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("register user works ");
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is public id",
      url: "This is url",
    },
  });

  const token = user.getJWTToken();
  res.status(201).json({
    code: 201,
    message: "User registered successfully",
    error: null,
    data: {
      token,
    },
  });
});

/* Login user */
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
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

  const token = user.getJWTToken();
  res.status(200).json({
    code: 200,
    message: "User logged in successfully",
    error: null,
    data: {
      token,
    },
  });
});

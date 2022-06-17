const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Register a User
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

  res.status(201).json({
    code: 201,
    message: "User registered successfully",
    error: null,
    data: {
      user,
    },
  });
});

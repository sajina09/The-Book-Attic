const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [30, "Name can't exceed 30 characters"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Password must be at least 8 characters"],
    maxlength: [15, "Password can't exceed 15 characters"],
    trim: true,
    select: false,
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
    trim: true,
  },
  resetPassword: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

/* Compare password */
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);

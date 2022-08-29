const res = require("express/lib/response");
const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server error";
  err.data = err.data || null;
  err.error = err.error || "Error";

  if (err.Name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = "Duplicate key entered";
    err = new ErrorHandler(message, 400);
  }

  if (err.Name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  if (err.Name === "TokenExpiredError") {
    const message = `Json Web Token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    code: err.statusCode,
    message: err.message,
    error: err.error,
    data: err.data,
  });
};

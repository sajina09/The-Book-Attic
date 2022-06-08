const res = require("express/lib/response");
const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server error";
  err.data = err.data || null;
  err.error = err.error || "Error";

  res.status(err.statusCode).json({
    code: err.statusCode,
    message: err.message,
    error: err.error,
    data: err.data,
  });
};

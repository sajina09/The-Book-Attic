/* Get response */
const getResponse = (res, statusCode, message, data) => {
  this.res = res || null;
  this.statusCode = statusCode || 500;
  this.message = message || "Internal Server error";
  this.data = data || null;

  res.status(statusCode).json({
    code: statusCode,
    message,
    error: null,
    data,
  });
};

module.exports = getResponse;

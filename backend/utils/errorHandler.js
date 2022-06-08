class ErrorHandler extends Error {
  constructor(statusCode, message, error, data) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.error = error;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorHandler;

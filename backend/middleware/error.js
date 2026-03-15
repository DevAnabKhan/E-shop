import ErrorHandler from "../utils/ErrorHandler.js";

export const error = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose Cast Error
  if (err.name === "CastError") {
    message = `Resource not found with id: ${err.value}`;
    statusCode = 400;
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate ${field} entered`;
    statusCode = 400;
  }

  // Validation Errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    message = errors.join(", ");
    statusCode = 400;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    message = "Invalid token. Please login again.";
    statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    message = "Your session has expired. Please login again.";
    statusCode = 401;
  }

  // Multer file errors
  if (err.code === "LIMIT_FILE_SIZE") {
    message = "File is too large";
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

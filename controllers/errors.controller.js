import errorHandler from "../utility/errorHandler";

export const globalErrorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.name === "CastError") err = handCastError(err);
  if (err.name === "ValidationError") err = handleValidationErrorDB(err);
  if (err.code === 11000) err = handleDuplicateFieldsDB(err);

  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
  });
};

export const handCastError = (err) => {
  console.log(err.value);
  const message = `Invalid ${err.path}: ${
    typeof err.value !== "object" ? err.value : err.value._id
  }`;
  return new errorHandler(message, 400);
};

export const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}`;
  return new errorHandler(message, 400);
};

export const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new errorHandler(message, 400);
};

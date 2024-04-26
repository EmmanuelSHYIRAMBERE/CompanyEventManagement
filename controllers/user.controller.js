import { User } from "../models/user.model";
import { usersValidationSchema } from "../models/user.model";
import { catchAsyncError } from "../utility/catchSync";
import errorHandler from "../utility/errorHandler";

// Create a new user
export const createUser = catchAsyncError(async (req, res, next) => {
  const { error } = usersValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    return next(new errorHandler(errorMessage, 400));
  }

  const newUser = new User(req.body);
  await newUser.save();

  res.status(201).json(newUser);
});

// Get all users
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Get user by ID
export const getUserById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }
  res.status(200).json(user);
});

// Update user by ID
export const updateUserById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const { error } = usersValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    return next(new errorHandler(errorMessage, 400));
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return next(new errorHandler("User not found", 404));
  }

  res.status(200).json(updatedUser);
});

// Delete user by ID
export const deleteUserById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return next(new errorHandler("User not found", 404));
  }
  res.status(200).json({ message: "User deleted successfully" });
});

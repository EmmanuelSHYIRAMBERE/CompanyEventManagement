import { Booking } from "../models/booking.model";
import { bookingValidationSchema } from "../models/booking.model";
import { catchAsyncError } from "../utility/catchSync";
import errorHandler from "../utility/errorHandler";

// Create a new booking
export const createBooking = catchAsyncError(async (req, res, next) => {
  const { error } = bookingValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    return next(new errorHandler(errorMessage, 400));
  }

  const newBooking = new Booking(req.body);
  await newBooking.save();

  res.status(201).json(newBooking);
});

// Get all bookings
export const getAllBookings = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.find();
  res.status(200).json(bookings);
});

// Get booking by ID
export const getBookingById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new errorHandler("Booking not found", 404));
  }
  res.status(200).json(booking);
});

// Update booking by ID
export const updateBookingById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const { error } = bookingValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    return next(new errorHandler(errorMessage, 400));
  }

  const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedBooking) {
    return next(new errorHandler("Booking not found", 404));
  }

  res.status(200).json(updatedBooking);
});

// Delete booking by ID
export const deleteBookingById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const deletedBooking = await Booking.findByIdAndDelete(id);
  if (!deletedBooking) {
    return next(new errorHandler("Booking not found", 404));
  }
  res.status(200).json({ message: "Booking deleted successfully" });
});

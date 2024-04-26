const PaypackJs = require("paypack-js").default;
require("dotenv").config();

const paypack = PaypackJs.config({
  client_id: process.env.packID,
  client_secret: process.env.packScret,
});

import { Booking } from "../models/booking.model";
import { bookingValidationSchema } from "../models/booking.model";
import { Event } from "../models/event.model";
import { User } from "../models/user.model";
import { catchAsyncError } from "../utility/catchSync";
import errorHandler from "../utility/errorHandler";

// Create a new booking
export const bookEvent = catchAsyncError(async (req, res, next) => {
  const { error } = bookingValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    return next(new errorHandler(errorMessage, 400));
  }

  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new errorHandler(`User with ID ${userId} not found`, 404));
  }

  const eventId = req.params.id;
  const event = await Event.findById(eventId);
  if (!event) {
    return next(new errorHandler(`Event with ID ${eventId} not found`, 404));
  }

  const { ticketsBooked, userNumber } = req.body;

  // Check if requested tickets are available
  if (ticketsBooked > event.availableTicket) {
    const errorMessage = `Requested tickets are not available. Available tickets: ${event.availableTicket}`;
    return next(new errorHandler(errorMessage, 400));
  }

  req.body.totalPrice = event.price * ticketsBooked;
  req.body.event_id = eventId;
  req.body.user_id = userId;

  const paymentResult = await paypack.cashin({
    number: userNumber,
    amount: req.body.totalPrice,
    environment: "development",
  });

  req.body.payment_id = paymentResult.data.ref;

  // Create the booking
  const newBooking = await Booking.create(req.body);

  // Update available tickets

  event.availableTicket = event.availableTicket - ticketsBooked;
  await event.save();

  res.status(201).json({
    message: "success",
    booking: newBooking,
    paymentResult: paymentResult.data,
  });
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

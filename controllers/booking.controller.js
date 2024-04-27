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
  const filteredBookings = [];

  for (const booking of bookings) {
    const user = await User.findById(booking.user_id);
    const event = await Event.findById(booking.event_id);

    const bookingData = {
      ticketsBooked: booking.ticketsBooked,
      userNumber: booking.userNumber,
      totalPrice: booking.totalPrice,
      payment_id: booking.payment_id,
      status: booking.status,
      userName: user.fullNames,
      eventName: event.title,
      eventLocation: event.location,
      date: event.date,
    };

    filteredBookings.push(bookingData);
  }

  res.status(200).json(filteredBookings);
});

// Get booking by ID
export const getBookingById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new errorHandler("Booking not found", 404));
  }

  const user = await User.findById({ _id: booking.user_id });
  const event = await Event.findById({ _id: booking.event_id });

  res.status(200).json({
    booking,
    userName: user.fullNames,
    eventName: event.title,
    eventLocation: event.location,
    date: event.date,
  });
});

// Update booking by ID
export const updateBookingById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const booking = await Booking.findById({ _id: id });
  if (!booking) {
    return next(new errorHandler("Booking not found", 404));
  }

  booking.status = "cancelled";
  await booking.save();

  const event = await Event.findById({ _id: booking.event_id });

  event.availableTicket = event.availableTicket + booking.ticketsBooked;
  await event.save();

  res.status(200).json({ message: "Booking cancelled successfully" });
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

// Delete booking by ID
export const cancelBookingById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const booking = await Booking.findById({ _id: id });
  if (!booking) {
    return next(new errorHandler("Booking not found", 404));
  }

  booking.status = "cancelled";
  await booking.save();

  const event = await Event.findById({ _id: booking.event_id });

  event.availableTicket = event.availableTicket + booking.ticketsBooked;
  await event.save();

  res.status(200).json({ message: "Booking cancelled successfully" });
});

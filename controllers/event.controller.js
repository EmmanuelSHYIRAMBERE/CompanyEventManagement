import { Event, eventValidationSchema } from "../models/event.model";
import { catchAsyncError } from "../utility/catchSync";
import cloudinary from "../utility/cloudinary";
import errorHandler from "../utility/errorHandler";

// Create a new event
export const createEvent = catchAsyncError(async (req, res, next) => {
  const { error } = eventValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    return next(new errorHandler(errorMessage, 400));
  }

  const { title, location, date, seatNumber, price, category, description } =
    req.body;

  let image = "";

  if (req.file) {
    const eventPicture = await cloudinary.uploader.upload(req.file.path);
    image = eventPicture.secure_url;
  }

  req.body.availableTicket = seatNumber;

  const newEvent = await Event.create({
    title,
    location,
    date,
    availableTicket: req.body.availableTicket,
    seatNumber,
    price,
    category,
    description,
    image,
  });

  res.status(201).json({ message: "success", event: newEvent });
});

// Get all events
export const getAllEvents = catchAsyncError(async (req, res, next) => {
  const events = await Event.find();

  console.log("events", events);

  res.status(200).json(events);
});

// Get event by ID
export const getEventById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) {
    return next(new errorHandler("Event not found", 404));
  }
  res.status(200).json(event);
});

// Update event by ID
export const updateEventById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const { error } = eventValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    return next(new errorHandler(errorMessage, 400));
  }

  const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedEvent) {
    return next(new errorHandler("Event not found", 404));
  }

  res.status(200).json(updatedEvent);
});

// Delete event by ID
export const deleteEventById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const deletedEvent = await Event.findByIdAndDelete(id);
  if (!deletedEvent) {
    return next(new errorHandler("Event not found", 404));
  }
  res.status(200).json({ message: "Event deleted successfully" });
});

import mongoose from "mongoose";
import Joi from "joi";

export const eventValidationSchema = Joi.object({
  title: Joi.string().required(),
  location: Joi.string().required(),
  date: Joi.date().required(),
  ticketAvailability: Joi.number().integer().min(0).required(),
  image: Joi.string().required(),
  seatNumber: Joi.number().integer().min(1).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  isAvailable: Joi.boolean().default(true),
});

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    ticketAvailability: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    seatNumber: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["pending", "started", "ended", "cancelled"],
      default: "pending",
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);

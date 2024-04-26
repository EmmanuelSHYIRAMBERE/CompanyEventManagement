import mongoose from "mongoose";
import Joi from "joi";

export const bookingValidationSchema = Joi.object({
  event_id: Joi.string().required(),
  ticketsBooked: Joi.number().integer().min(1).required(),
  
});

const bookingSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    event_id: {
      type: String,
      required: true,
    },
    ticketsBooked: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);

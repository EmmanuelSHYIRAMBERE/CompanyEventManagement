import mongoose from "mongoose";
import Joi from "joi";

export const bookingValidationSchema = Joi.object({
  ticketsBooked: Joi.number().integer().min(1).required(),
  userNumber: Joi.string().min(9).required(),
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
    userNumber: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    payment_id: {
      type: String,
      required: false,
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

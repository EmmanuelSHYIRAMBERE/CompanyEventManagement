import mongoose from "mongoose";
import Joi from "joi";

export const usersValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  fullNames: Joi.string().required(),
  profilePicture: Joi.string().optional(),
  phoneNo: Joi.string().required(),
  location: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullNames: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    phoneNo: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

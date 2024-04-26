import { User } from "../models/user.model";
import { getToken } from "../utility";
import { catchAsyncError } from "../utility";
import errorHandler from "../utility/errorHandler";
import { comparePassword } from "../utility/pwdEncryption";

export const logIn = catchAsyncError(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new errorHandler("Please provide email and password", 400));
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new errorHandler(`user with this email not found, try others`, 404)
    );
  }

  let isPasswordMatch = await comparePassword(req.body.password, user.password);

  if (!isPasswordMatch) {
    return next(new errorHandler(`Incorrect password. Please try again.`, 401));
  }

  let token = getToken({ _id: user._id, email: user.email });

  res.status(200).json({
    message: "User logged successfully!",
    access_token: token,
    user: {
      userId: user._id,
      email: user.email,
      fullNames: user.fullNames,
      phoneNo: user.phoneNo,
      location: user.location,
      role: user.role,
    },
  });
});

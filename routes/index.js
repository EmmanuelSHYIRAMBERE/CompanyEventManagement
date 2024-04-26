import express from "express";
import errorHandler from "../utility/errorHandler";
import usersRouter from "./user.route";
import { globalErrorController } from "../controllers";
import authRouter from "./authentication.route";
import eventsRouter from "./event.route";
import bookingsRouter from "./booking.route";

const systemRouter = express.Router();

systemRouter.use("/users", usersRouter);
systemRouter.use("/auth", authRouter);
systemRouter.use("/events", eventsRouter);
systemRouter.use("/bookings", bookingsRouter);

systemRouter.all("*", (req, res, next) => {
  next(new errorHandler(`Failure connecting to the server!`, 404));
});

systemRouter.use(globalErrorController);

export default systemRouter;

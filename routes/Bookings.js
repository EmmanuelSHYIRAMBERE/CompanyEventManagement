import express from "express";

const bookingsRouter = express.Router();

import {
  bookParkingSpot,
  getBookings,
  deleteBooking,
  updateBooking,
  modifyBooking,
  getCheckOutSession,
  getRecentBookingOfUser,
  getOneBooking,
  getAllCompletedBookingOfUser,
} from "../controllers/Bookings";
import { verifyToken } from "../middleware";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     reservations:
 *       type: object
 *       required:
 *         - carID
 *         - bookedDate
 *         - startHour
 *         - endHour
 *         - totalPrice
 *         - Duration
 *       properties:
 *         carID:
 *           type: string
 *           description: The id of the user's car
 *         bookedDate:
 *           type: string
 *           description: The date to reserve a slot
 *         startHour:
 *           type: string
 *           description: A starting hour
 *         endHour:
 *           type: string
 *           description: An ending hour
 *         totalPrice:
 *           type: string
 *           description: The total Price
 *         Duration:
 *           type: string
 *           description: The duration time
 *       example:
 *         carID: "P-12345"
 *         bookedDate: "2023-12-08"
 *         startHour: "15:30"
 *         endHour: "17:12"
 *         totalPrice: 100
 *         Duration: 3 hours
 */

/**
 * @swagger
 * tags:
 *   name: Resevations
 *   description: The reservations managing API
 */

/**
 * @swagger
 * /parking/reservations/bookParkingSlot/{id}:
 *   post:
 *     summary: Reserve a parking slot
 *     tags: [Resevations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The slot id
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/reservations'
 *     responses:
 *       200:
 *          description: The parking slot reserved successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/reservations'
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.post("/bookParkingSlot/:id", verifyToken, bookParkingSpot);

/**
 * @swagger
 * /parking/reservations/getreservations:
 *   get:
 *     summary: Returns the list of all the reserved parking slot
 *     tags: [Resevations]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/reservations'
 *       403:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.get("/getreservations", verifyToken, getBookings);

/**
 * @swagger
 * /parking/reservations/getRecentBookingOfUser:
 *   get:
 *     summary: Returns the all the parking slot reserved by user
 *     tags: [clientAccess]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/reservations'
 *       403:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.get(
  "/getRecentBookingOfUser",
  verifyToken,
  getRecentBookingOfUser
);

/**
 * @swagger
 * /parking/reservations/getAllCompletedBookingOfUser:
 *   get:
 *     summary: Returns the all the parking slot reserved by user that completed
 *     tags: [clientAccess]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/reservations'
 *       403:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.get(
  "/getAllCompletedBookingOfUser",
  verifyToken,
  getAllCompletedBookingOfUser
);

/**
 * @swagger
 * /parking/reservations/getOneReservedData/{id}:
 *   get:
 *     summary: Get the reservation details
 *     tags: [Resevations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The reservation id
 *     responses:
 *       200:
 *          description: The success
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/reservations'
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.get("/getOneReservedData/:id", getOneBooking);

/**
 * @swagger
 * /parking/reservations/deleteReservationData/{id}:
 *   delete:
 *     summary: Delete the booked data by id
 *     tags: [Resevations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The booked data id
 *     responses:
 *       200:
 *          description: The current booked data was deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/bookings'
 *       204:
 *          description: No any booking data in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The booking data was not found
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.delete("/deleteReservationData/:id", deleteBooking);

bookingsRouter.put("/updatebooking/:id", updateBooking);

bookingsRouter.patch("/modifybooking/:id", modifyBooking);

bookingsRouter.get("/checkout/:id", getCheckOutSession);

export default bookingsRouter;

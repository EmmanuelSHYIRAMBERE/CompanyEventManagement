import express from "express";
import { verifyToken } from "../middleware/tokenVerification";
import {
  bookEvent,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
} from "../controllers";
import { admin } from "../middleware/roleVerification";

const bookingsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API endpoints for managing bookings
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - ticketsBooked
 *         - userNumber
 *       properties:
 *         ticketsBooked:
 *           type: integer
 *           minimum: 1
 *           description: Number of tickets booked
 *         userNumber:
 *           type: integer
 *           minimum: 9
 *           description: User phoneNumber
 *       example:
 *         ticketsBooked: 2
 *         userNumber: "00000000000000"
 */

// Create a new booking
/**
 * @swagger
 * /api/bookings/{id}:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Unauthorized request, token missing or invalid
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
bookingsRouter.post("/:id", verifyToken, bookEvent);

// Get all bookings
/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Internal server error
 */
bookingsRouter.get("/", verifyToken, admin, getAllBookings);

// Get booking by ID
/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid booking ID format
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
bookingsRouter.get("/:id", getBookingById);

// Update booking by ID
/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Update booking by ID
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid booking ID format or request body
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
bookingsRouter.put("/:id", updateBookingById);

// Delete booking by ID
/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete booking by ID
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       400:
 *         description: Invalid booking ID format
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
bookingsRouter.delete("/:id", deleteBookingById);

export default bookingsRouter;

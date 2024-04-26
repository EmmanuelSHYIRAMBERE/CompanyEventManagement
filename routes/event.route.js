import express from "express";
import {
  createEvent,
  deleteEventById,
  getAllEvents,
  getEventById,
  updateEventById,
} from "../controllers/event.controller";
import EventImagesUpload from "../middleware/EventImagesUpload";
import { verifyToken } from "../middleware/tokenVerification";

const eventsRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - location
 *         - date
 *         - seatNumber
 *         - price
 *         - category
 *         - description
 *         - image
 *       properties:
 *         title:
 *           type: string
 *           description: Event title
 *           default: "Untitled Event"
 *         location:
 *           type: string
 *           description: Event location
 *           default: "Unknown Location"
 *         date:
 *           type: string
 *           format: date
 *           description: Event date
 *           default: "2024-04-30"
 *         image:
 *           type: string
 *           format: binary
 *           description: Event image file
 *         seatNumber:
 *           type: integer
 *           minimum: 1
 *           description: Number of seats available
 *           default: 1
 *         price:
 *           type: number
 *           minimum: 0
 *           description: Price per ticket
 *           default: 0
 *         category:
 *           type: string
 *           description: Event category
 *           default: "General"
 *         description:
 *           type: string
 *           description: Event description
 *           default: "No description provided"
 *       example:
 *         title: "Event Title"
 *         location: "Event Location"
 *         date: "2024-04-30"
 *         image: (binary data)
 *         seatNumber: 200
 *         price: 20
 *         category: "Concert"
 *         description: "This is a description of the event."
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            multipart/form-data:
 *               schema:
 *                   $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid request body or missing required fields
 *       500:
 *         description: Internal server error
 */
eventsRouter.post("/", EventImagesUpload, verifyToken, createEvent);
/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Internal server error
 */
eventsRouter.get("/", getAllEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           description: Event ID
 *     responses:
 *       200:
 *         description: Event details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid event ID format
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
eventsRouter.get("/:id", getEventById);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update event by ID
 *     tags: [Events]
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
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid event ID format or request body
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
eventsRouter.put("/:id", updateEventById);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete event by ID
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       400:
 *         description: Invalid event ID format
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
eventsRouter.delete("/:id", deleteEventById);

export default eventsRouter;

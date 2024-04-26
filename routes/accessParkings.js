import express from "express";
const parkingRouter = express.Router();

import {
  checkAvailableParkingsByUser,
  addNewParking,
  deleteParkingSlot,
  getOneParking,
  getTotalParking,
  updateParking,
  getReservedSlots,
  getAllSlots,
} from "../controllers/Parking";
import { admin, verifyToken } from "../middleware";
import { buildingStatistics, sytemStatistics } from "../controllers/Statistics";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     parkings:
 *       type: object
 *       required:
 *         - Slot
 *       properties:
 *         Slot:
 *           type: string
 *           description: The name of the parking slot
 *       example:
 *         Slot: "P123"
 */

/**
 * @swagger
 * tags:
 *   name: clientAccess
 *   description: The client accessibility managing API
 */

/**
 * @swagger
 * tags:
 *   name: Slots
 *   description: The Slots managing API
 */

/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: The statistics managing API
 */

/**
 * @swagger
 * /parking/slots/checkSlotsByUser/{id}:
 *   get:
 *     summary: Returns all slots in a building
 *     tags: [clientAccess]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The building id
 *     responses:
 *       200:
 *          description: The available slots found successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found.
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.get("/checkSlotsByUser/:id", checkAvailableParkingsByUser);

/**
 * @swagger
 * /parking/slots/addNewSlot/{id}:
 *   post:
 *     summary: Add a new parking slot
 *     tags: [Slots]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The floor id
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *     responses:
 *       201:
 *          description: The new slot successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.post("/addNewSlot/:id", verifyToken, addNewParking);

/**
 * @swagger
 * /parking/slots/getAllSlots/{id}:
 *   get:
 *     summary: Returns total slots of a floor
 *     tags: [Slots]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The floor id
 *     responses:
 *       200:
 *          description: The parking slots found successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found.
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.get("/getAllSlots/:id", verifyToken, getTotalParking);

/**
 * @swagger
 * /parking/slots/getAllSlots:
 *   get:
 *     summary: Returns total slots of a system
 *     tags: [Slots]
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
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found.
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.get("/getAllSlots", verifyToken, admin, getAllSlots);

/**
 * @swagger
 * /parking/slots/getReservedSlots/{id}:
 *   get:
 *     summary: Returns reserved slots of a floor
 *     tags: [Resevations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The floor id
 *     responses:
 *       200:
 *          description: The reserved slots found successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found.
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.get("/getReservedSlots/:id", verifyToken, getReservedSlots);

/**
 * @swagger
 * /parking/slots/getOneSlot/{id}:
 *   get:
 *     summary: Get a single parking slot by id
 *     tags: [Slots]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The parking slot id
 *     responses:
 *       200:
 *          description: The parking slot found by id
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.get("/getOneSlot/:id", getOneParking);

/**
 * @swagger
 * /parking/slots/deleteSlot/{id}:
 *   delete:
 *     summary: Delete a slot
 *     tags: [Slots]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The slot id
 *     responses:
 *       200:
 *          description: The slot deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.delete("/deleteSlot/:id", verifyToken, deleteParkingSlot);

/**
 * @swagger
 * /parking/slots/updateSlot/{id}:
 *   put:
 *     summary: Update the parking slot's data by id
 *     tags: [Slots]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The parking slot's id
 *     responses:
 *       200:
 *          description: The parking slot updated successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.put("/updateSlot/:id", verifyToken, updateParking);

parkingRouter.get("/buildingStatistics", verifyToken, buildingStatistics);

parkingRouter.get("/sytemStatistics", verifyToken, admin, sytemStatistics);

export default parkingRouter;

import express from "express";
const notificationRouter = express.Router();

import { admin, verifyToken } from "../middleware";
import {
  deleteAllNotifications,
  deleteSingleNotification,
  getBuildingNotification,
  getBuildingNotifications,
  getNotifications,
} from "../controllers/Notification";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Notification:
 *       properties:
 *         user:
 *           type: string
 *           description: The name of the user
 *         type:
 *           type: string
 *           description: The type of notification
 *         actionMade:
 *           type: string
 *           description: The action made
 *       example:
 *         user: "user names"
 *         type: "signup"
 *         actionMade: "User registered"
 */

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: The notification managing API
 */

/**
 * @swagger
 * /parking/notification/getNotifications:
 *   get:
 *     summary: Returns notifications
 *     tags: [Notifications]
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
 *                   $ref: '#/components/schemas/Notification'
 *       204:
 *          description: No content found.
 *       500:
 *          description: Internal Server Error
 */

notificationRouter.get(
  "/getNotifications",
  verifyToken,
  admin,
  getNotifications
);

/**
 * @swagger
 * /parking/notification/getBuildingNotifications:
 *   get:
 *     summary: Returns building notifications
 *     tags: [Notifications]
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
 *                   $ref: '#/components/schemas/Notification'
 *       204:
 *          description: No content found.
 *       500:
 *          description: Internal Server Error
 */

notificationRouter.get(
  "/getBuildingNotifications",
  verifyToken,
  getBuildingNotifications
);

/**
 * @swagger
 * /parking/notification/deleteSingleNotification/{id}:
 *   delete:
 *     summary: Delete the notification data by id
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The notification id
 *     responses:
 *       200:
 *          description: A notification deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Notification'
 *       401:
 *          description: A user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

notificationRouter.delete(
  "/deleteSingleNotification/:id",
  verifyToken,
  deleteSingleNotification
);

/**
 * @swagger
 * /parking/notification/deleteAllNotifications:
 *   delete:
 *     summary: Delete all notification data
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: A notification deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Notification'
 *       401:
 *          description: A user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

notificationRouter.delete(
  "/deleteAllNotifications",
  verifyToken,
  admin,
  deleteAllNotifications
);

export default notificationRouter;

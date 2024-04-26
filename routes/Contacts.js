import express from "express";

const contactsRouter = express.Router();

import {
  makeContact,
  getContacts,
  getContact,
  deleteContact,
  updateContact,
  replyContacted,
} from "../controllers/Contacts";
import { admin, verifyToken } from "../middleware";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     contacts:
 *       type: object
 *       required:
 *         - fullNames
 *         - email
 *         - message
 *       properties:
 *         fullNames:
 *           type: string
 *           description: The full names of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         message:
 *           type: string
 *           description: The message to be communicated
 *       example:
 *         fullNames: "example names"
 *         email: email@example.com
 *         message: "Hello, this is my comment."
 *     reply:
 *       type: object
 *       required:
 *         - replyMessage
 *       properties:
 *         replyMessage:
 *           type: string
 *           description: The reply message
 *       example:
 *         replyMessage: "Hello, this is my reply message."
 */

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: The contacts managing API
 */

/**
 * @swagger
 * /parking/contacts/makecontact:
 *   post:
 *     summary: Write a contact message
 *     tags: [Contacts]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/contacts'
 *     responses:
 *       201:
 *          description: You message sent successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/contacts'
 *       500:
 *          description: Internal Server Error
 */

contactsRouter.post("/makecontact", makeContact);

/**
 * @swagger
 * /parking/contacts/getcontacts:
 *   get:
 *     summary: Returns the all contacts data
 *     tags: [Contacts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: The success
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/contacts'
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

contactsRouter.get("/getcontacts", verifyToken, admin, getContacts);

contactsRouter.get("/getcontact/:id", verifyToken, admin, getContact);

contactsRouter.put("/updatecontact/:id", verifyToken, admin, updateContact);

/**
 * @swagger
 * /parking/contacts/deletecontact/{id}:
 *   delete:
 *     summary: Delete the contact data
 *     tags: [Contacts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The contact id
 *     responses:
 *       200:
 *          description: The contact deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/contacts'
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The contact not found
 *       500:
 *          description: Internal Server Error
 */

contactsRouter.delete("/deletecontact/:id", verifyToken, admin, deleteContact);

/**
 * @swagger
 * /parking/contacts/replycontact/{id}:
 *   post:
 *     summary: send a reply message
 *     tags: [Contacts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/reply'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The contact id
 *     responses:
 *       201:
 *          description: The new reply information sent successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/reply'
 *       500:
 *          description: Internal Server Error
 */

contactsRouter.post("/replycontact/:id", verifyToken, admin, replyContacted);

export default contactsRouter;

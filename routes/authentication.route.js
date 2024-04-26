import express from "express";
import { logIn } from "../controllers/auth.controller";

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API endpoints for managing authentication
 */

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Log in user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *             example:
 *               email: email@example.com
 *               password: "************"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
authRouter.post("/", logIn);

export default authRouter;

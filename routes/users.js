const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { log_validator, reg_validator } = require("../validators/userValidator");

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Creates a new user with the provided data. The request body must include all required fields.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Created - User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request - Invalid or missing request data.
 *       401:
 *         description: Unauthorized - Authentication is required.
 *       409:
 *          description: Conflict - Email already exists
 *       500:
 *         description: Internal Server Error - An unexpected error occurred on the server.
 */

router.post("/register", validate(reg_validator), usersController.registerUser);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Authenticate user
 *     description: Logs in a user and returns a JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: OK - Login Successfully
 *         content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          msg:
 *                              type: string
 *                              example: User logged in successfully
 *                          token:
 *                              type: string
 *                              example: your.jwt.token
 *
 *       400:
 *         description: Bad Request - Invalid email or password.
 *       401:
 *         description: Unauthorized - Authentication is required.
 *       404:
 *          description: Not Found - User not found
 *       500:
 *         description: Internal Server Error - An unexpected error occurred on the server.
 */
router.post("/login", validate(log_validator), usersController.loginUser);

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *          - bearerAuth: []
 *     summary: Feth information of current logged in user
 *     description: Retrieves the information of the authenticated user. This route is JWT protected.
 *     responses:
 *       200:
 *         description: OK - Successfully retrieved logged in users's information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentUser'
 *       400:
 *         description: Bad Request - Invalid query parameters provided.
 *       401:
 *          description: Unauthorized - Missing or invalid token
 *       404:
 *          description: Not Found - User not found
 *       500:
 *         description: Internal Server Error - An unexpected error occurred on the server.
 */
router.get("/me", auth, usersController.currentUser);

/**
 * @swagger
 * /api/v1/users/forgot-password:
 *   post:
 *     tags:
 *       - Users
 *     summary: Send password reset link
 *     description: Sends a password reset link to the user's registered email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetLink'
 *     responses:
 *       200:
 *         description: OK - Password Reset Link Sent succesfully.
 *         content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: boolean
 *                              example: true
 *                          message:
 *                              type: string
 *                              example: Password reset link sent!
 *                          data:
 *                              type: string
 *                              example: your.jwt.token
 *       400:
 *         description: Bad Request - Missing or invalid email address.
 *       404:
 *         description: Not Found - User not found.
 *         content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: boolean
 *                              default: false
 *                          message:
 *                              type: string
 *                              example: User not found
 *       500:
 *         description: Internal Server Error - Failed to send email
 */
router.post("/forgot-password", usersController.resetLink);

/**
 * @swagger
 * /api/v1/users/reset-password/{token}:
 *   post:
 *     tags:
 *       - Users
 *     summary: Resets password using token
 *     description: Reset the user's password using the token sent to their email.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token sent to the user's email for resetting password.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: OK - Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                      type: boolean
 *                      default: true
 *                  message:
 *                      type: string
 *                      example: Password reset successfully
 *       400:
 *         description: Bad Request - Missing or invalid pasword
 *       404:
 *         description: Not Found - Invalid or expired token
 *       500:
 *         description: Internal Server Error - Failed to reset password
 */
router.post("/reset-password/:token", usersController.resetPassword);

module.exports = router;

const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const taskValidator = require("../validators/taskValidator");
const validateObjectID = require("../middleware/validateObjectID");

// protect all routes
router.use(auth);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     security:
 *          - bearerAuth: []
 *     summary: Retrieve a list of tasks
 *     description: This is a JWT protected route. Authentication in required. Retrieves all tasks for the authenticated users's
 *     responses:
 *       200:
 *         description: OK - Successfully retrieved the list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskArrayResponse'
 *       401:
 *         description: Unauthorized - Authentication is required
 *       500:
 *         description: Internal Server Error - An unexpected error occurred on the server.
 */
router.get("/", taskController.getAllTask); // Get All Tasks

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     tags:
 *       - Tasks
 *     security:
 *          - bearerAuth: []
 *     summary: Retrieve a task by its unique identifier
 *     description: Fetches a specific task identified by its unique ID. Useful for retrieving detailed information about a single resource. This route is JWT protected
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the task.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK - Successfully retrieved the resource.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskSingleResponse'
 *       400:
 *         description: Bad Request - Invalid ID format provided.
 *       404:
 *         description: Not Found - Task with the specified ID was not found.
 *       500:
 *         description: Internal Server Error - An unexpected error occurred on the server.
 */
router.get("/:id", validateObjectID, taskController.getTask);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     security:
 *          - bearerAuth: []
 *     summary: Create a new task
 *     description: Creates a new task with the provided data. The request body must include all required fields. This route is JWT protected
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Created - The resource was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskSingleResponse'
 *       400:
 *         description: Bad Request - Invalid or missing request data.
 *       401:
 *         description: Unauthorized - Authentication is required.
 *       500:
 *         description: Internal Server Error - An unexpected error occurred on the server.
 */
router.post("/", validate(taskValidator), taskController.createTask); // Create New Task

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   patch:
 *     tags:
 *       - Tasks
 *     security:
 *          - bearerAuth: []
 *     summary: Partially update a task
 *     description: Updates the details of a specific task identified by its unique ID. The request body must include all fields to be updated.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the task to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Update name only"
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: OK - The resource was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskSingleResponse'
 *       400:
 *         description: Bad Request - Invalid or missing request data.
 *       401:
 *         description: Unauthorized - Authentication is required.
 *       404:
 *         description: Not Found - Resource with the specified ID was not found.
 *       500:
 *         description: Internal Server Error - An unexpected error occurred on the server.
 */
router.patch("/:id", validateObjectID, taskController.updateTask); // Update Task

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     security:
 *          - bearerAuth: []
 *     summary: Delete a task by its unique identifier
 *     description: Deletes a specific resource identified by its unique ID. This operation is irreversible.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the task to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK - The task was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskDeletedResponse'
 *       400:
 *         description: Bad Request - Invalid ID format provided.
 *       401:
 *         description: Unauthorized - Authentication is required.
 *       404:
 *         description: Not Found - Task with the specified ID was not found.
 *       500:
 *         description: Internal Server Error - An unexpected error occurred on the server.
 */
router.delete("/:id", validateObjectID, taskController.deleteTask); // Delete Task

module.exports = router;

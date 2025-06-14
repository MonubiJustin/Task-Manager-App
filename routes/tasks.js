const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController')
const auth = require('../middleware/auth');

// protect all routes
router.use(auth);

// Get All Tasks
router.get('/', taskController.getAllTask)

// getting single tasks
router.get('/:id', taskController.getTask)

// Create New Task
router.post('/', taskController.createTask)

// Update Task
router.patch('/:id', taskController.updateTask)

// Delete Task
router.delete('/:id', taskController.deleteTask)


module.exports = router;
const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController')

// Registration route
router.post('/register', usersController.registerUser)
// Login route
router.post('/login', usersController.loginUser);


module.exports = router;
const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController')
const auth = require('../middleware/auth');

// Registration route
router.post('/register', usersController.registerUser)
// Login route
router.post('/login', usersController.loginUser);

// me
router.get('/me', auth, usersController.currentUser);


module.exports = router;
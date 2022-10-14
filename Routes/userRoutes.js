// Express Module
const express = require('express');

// Create router to handle the routes and requests
const router = express.Router();
const userController = require('./../controller/userController');

// Creating User Routes
router.route('/').get(userController.getAllUsers);
router.route('/:_id').get(userController.getUserId);

module.exports = router;

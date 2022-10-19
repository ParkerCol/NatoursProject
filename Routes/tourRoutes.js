// Express Module
const express = require('express');
const tourController = require('./../controller/tourController');

// Create router to handle the routes and requests
const router = express.Router();

// Tour Routes
router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

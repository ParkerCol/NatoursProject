const Tour = require('./../models/tourModel');

//Read the JSON file
// const tourSimple = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
// );

// Create a new tour using async
exports.createTour = async (req, res) => {
  try {
    // Create and saves a new tour using the tourModel and waits for the promise to be resolved returning the new tour
    const newTour = await Tour.create(req.body);
    // Responds with the new tour that was created and saved
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    // Catches any errors and responds with the error
    res.status(400).json({
      status: 'Was not able ot create tour',
      message: err.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    // Query for the tour we want to update bases on id
    // new:true returns the updated tour , without returns the old tour
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Was not able ot create tour',
      message: err.message,
    });
  }
};

//

//  Get all tours
exports.getAllTour = async (req, res) => {
  try {
    // Bruild the query creating hard copy of the quey (query is an object and cant be copied by reference)
    console.log(req.query);
    //Destrcuturing the query object and creating a new object with the properties we want
    const queryObj = { ...req.query };
    // Remove the fields that we don't want to use in the query
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // Loop through the excluded fields and delete them from the query
    excludedFields.forEach((el) => delete queryObj[el]);
    //Finally we have a query that we can use to get the data we want
    const query = Tour.find(queryObj);
    // Execute the query
    const tours = await query;
    res.status(200).json({
      status: 'success',
      data: {
        'Tours Found': tours.length,
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'No Tours Could Be Found',
      message: err.message,
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // tour.findOne({ _id: req.params.id }); // This is the same as the line above
    res.status(200).json({
      status: 'The Tour was found',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'No Tour Found',
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'This Tour was deleted 👇',
      tour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'No Tour Found',
      message: err.message,
    });
  }
};

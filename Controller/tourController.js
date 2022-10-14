const Tour = require('./../models/tourModel');
const tourModel = require('./../models/tourModel');

// // Read Tour from jsonfile
// const tourSimple = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
// );

// Tour Router Callbacks
exports.getAllTour = async (req, res) => {
  try {
    const tours = await tourModel.find();
    res.status(200).json({
      status: 'success',
      data: {
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
    const tour = await tourModel.findById(req.params.id);
    // tour.findOne({ _id: req.params.id }); // This is the same as the line above
    res.status(200).json({
      status: 'success',
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

exports.patchId = (req, res) => {
  const tour = tourSimple.find((el) => el.id === parseInt(req.params.id));

  if (tour) {
    tourSimple[parseInt(tour.id)].name = req.body.name;
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tourSimple),
      (err) => {
        res.status(200).json({
          status: 'succes',
          data: {
            tour: tourSimple[parseInt(tour.id)],
          },
        });
      }
    );
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'No such tour. Use a valid path...',
    });
  }
};

exports.deleteId = (req, res) => {
  const tour = tourSimple.find((el) => el.id === parseInt(req.params.id));
  console.log(tour);

  if (tour) {
    tourSimple.splice(tour.id, 1);

    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tourSimple),
      (err) => {
        res.status(200).json({
          status: 'succes',
          data: {
            tour: tourSimple,
          },
        });
      }
    );
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'No such tour. Use a valid path...',
    });
  }
};

// Create a new tour using async
exports.createTour = async (req, res) => {
  try {
    // Create and saves a new tour using the tourModel and waits for the promise to be resolved returning the new tour
    const newTour = await tourModel.create(req.body);
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

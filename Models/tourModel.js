const mongoose = require('mongoose');

//Creating schema for a collection insidee the DataBes (shema is the structure of the collection)
const tourSchema = new mongoose.Schema({
  //Schema type options
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

//Creating a collection named "Tour" for the database with the "tourSchema" structure and saving the schema in the Tour
const Tour = mongoose.model('Tour', tourSchema);

//export mdule
module.exports = Tour;

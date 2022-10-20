const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
// Loads the config properties from the .env file
dotenv.config({ path: './config.env' });
//replace the password with the password you created in the mongodb atlas
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Connect to the database using mongoose (Use these options to avoid deprecation warnings) Immediately-invoked Function Expression
(async () => {
  try {
    await mongoose.connect(DB, { useNewUrlParser: true });
    console.log('DB connection successful!');
  } catch (err) {
    console.log('Error connecting to database 💥');
  }
})();

// Read JSON file (parse the data)
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import data into database Function

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from collection Function
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
//node dev-data/data/importData.js --import (to import data)

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

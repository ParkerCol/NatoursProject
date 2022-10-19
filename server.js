// Configre the .env file
const dotenv = require('dotenv');
const { json } = require('express');
const mongoose = require('mongoose');

// Loads the config properties from the .env file (goes before app)
dotenv.config({ path: './config.env' });

// Launch app with env config
const app = require('./app');

// Port Variable
const port = process.env.PORT || 3000;

// Start Server

console.log('Server Listening');
// Server Starts listening

(async () => {
  try {
    await app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  } catch (err) {
    console.log('Error starting server 💥');
  }
})();

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

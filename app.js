const express = require('express');
//Morgan is used to log the requests to the console for debugging purposes
const morgan = require('morgan');

// Create express app
const app = express();

// Mount routers for the app to use
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// express.json() is a middleware that parses the body of the request and puts it into req.body
app.use(express.json());

// Routes

// On certain routes we use certain routhandlers
//Those routhandlers have functions that are called when a request is made to that route
app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);

module.exports = app;

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const env = require('dotenv').config();

// Routes
const auth = require('./routes/auth.route');
const account = require('./routes/account.route');
const post = require('./routes/image.route');

// App 
const app = express();

// Settings
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Views
app.use('/api/v1', auth);
app.use('/api/v1', account);
app.use('/api/v1', post);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    statusCode: err.status,
    message: res.locals.message,
    error: res.locals.error
  });
});

module.exports = app;

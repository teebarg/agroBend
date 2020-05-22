var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var marketRouter = require('./routes/market');
var authRouter = require('./routes/auth');
var imageRouter = require('./routes/image');
var categoryRouter = require('./routes/category');
var db = require('./models');

var cors = require('cors')
var app = express();

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.!e11');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit: '50mb'}));
app.use(cors())

app.use('/api/market', marketRouter);
app.use('/api/auth', authRouter);
app.use('/api/image', imageRouter);
app.use('/api/category', categoryRouter);

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
  res.render('error');
});

module.exports = app;

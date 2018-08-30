var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var mongoose = require('mongoose');
const passport = require('passport');
const db = require('./config/keys').mongoURI;

//Database connection
mongoose.connect(db);

mongoose.connection.on('connected', function() {
  console.log('Connection succesful');
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose error' + err);
})

mongoose.Promise = global.Promise;



const insuranceTypeRouter = require('./routes/insuranceTypeRoute');
const profileRouter = require('./routes/profileRoute');
const insuranceRouter = require('./routes/insuranceRoute')
const calculatorRouter = require('./routes/calculatorRoute');

var app = express();

//Passport settings

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use('/', insuranceTypeRouter);
app.use('/profiili', profileRouter);
app.use('/insurances', insuranceRouter);
app.use('/calculator', calculatorRouter);

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
  res.json('Sivua ei löydy!');
});

module.exports = app;

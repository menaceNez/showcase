var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');

var authRouter = require('./routes/auth');
var guardRouter = require('./routes/guard');
var usersRouter = require('./routes/users');
var charaRouter = require('./routes/characterRouter');
var gearRouter = require('./routes/gearRouter');

var app = express();

var allowedOrigin = [
  'http://localhost:4200/'
]

app.use(cors({
  origin: allowedOrigin,
  credentials:true
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'wowstats',
  saveUninitialized: false,
  resave: false,
  rolling: true,
  cookie: {
    secure: false,
  }
}))

mongoose.connect('mongodb://myAdmin:klobhunter88@192.168.124.214:27017')
.then(console.log("Connection to MongoDb Successful"))
.catch( (err) => console.log("Error Connecting: ", err));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter); // need to have this execute only once
app.use('/api', guardRouter);
app.use('/api/users', usersRouter);
app.use('/api/characters', charaRouter);
app.use('/api/items', gearRouter);
app.use('*', (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var subform = require('./routes/subform');
var usesession = require("./routes/usesession");
var usecookies = require("./routes/usecookies");
var usecrypto = require("./routes/usecrypto");
var reg = require("./routes/reg");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout");
var session = require('express-session');


var app = express();
app.listen(8000,function(){
  console.log("Server Start:http://127.0.0.1:8000/");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("shine"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'shine',
  resave:true,
  saveUninitialized:false
}))

app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use("/subform", subform);
app.use("/usesession", usesession);
app.use("/usecookies", usecookies);
app.use("/usecrypto", usecrypto);
app.use("/reg", reg);
app.use("/login",loginRouter);
app.use("/logout", logoutRouter);

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

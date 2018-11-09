var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// MongoDB의 ObjectId를 sesion에 저장하기 위한 모듈들
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/iSurveyTest');
var db = mongoose.connection;

var loginRouter = require('./routes/login');
var mainRouter = require('./routes/main');
var searchRouter = require('./routes/search');
var surveyRouter = require('./routes/survey');
var resultRouter = require('./routes/result');
var deleteRouter = require('./routes/delete');
var editRouter = require('./routes/edit');

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 아래와 같은 session을 사용한다.
app.use(session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({
		mongooseConnection: db
	})
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 로그인 관련 작업은 '/loginpage' 루트를 통해서 사용한다.
// 메인 루터는 '/' 루트를 통해서 사용한다.
app.use('/loginpage', loginRouter);
app.use('/', mainRouter);
app.use('/search', searchRouter);
app.use('/survey', surveyRouter);
app.use('/result', resultRouter);
app.use('/delete', deleteRouter);
app.use('/edit', editRouter);

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

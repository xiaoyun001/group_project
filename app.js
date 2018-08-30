// 引入依赖模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

 // 引入express-session中间件
 const session = require("express-session");

// 路由中间件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const inboundRouter = require('./routes/inbound.js');
var captchaRouter = require('./routes/captcha.js');

// 创建 Express 应用实例
var app = express();

// 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用各中间件完成应用功能
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("xm"));
//session配置：使用express-session中间件
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'xm',
  resave: false,
  saveUninitialized: true,
  cookie: {  maxAge: 45*60*1000  }
}));
// 指明静态资源存放位置
app.use(express.static(path.join(__dirname, 'public')));

// 使用路由中间件
app.use('/', indexRouter);
app.use('/users', usersRouter);
// 访问inbound目录下资源
app.use('/inbound', inboundRouter); 
app.use('/captcha',captchaRouter);

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

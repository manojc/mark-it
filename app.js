//required packeges
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//required packeges end

//db manager
//var db = require('./tools/database/database').db;
//db manager ends

//routes
var user = require('./routes/user');
var routes = require('./routes/index');
//routes end

//initialize app
var app = express();
//initialize app ends

//fevicon
app.use(favicon(__dirname + '/public/favicon.ico'));

//logger
app.use(logger('dev'));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//body parser ends

//coockie parser
app.use(cookieParser());

//public directory
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/user', user);
app.use('/', routes);
//routes end


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//create server
var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app is listening to http://%s:%s', host, port);
});

module.exports = app;
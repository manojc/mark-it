//required packeges
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var userAccountProvider = require('./provider/user-account.js');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

var FACEBOOK_APP_ID = '423338834538362';
var FACEBOOK_APP_SECRET = '1da8a9a3a796cc6de1fa4ab10444cdba';

var GOOGLE_CONSUMER_KEY = '978631038383-mc0lf23hgbhnrcvm8b22un241vdq04f0.apps.googleusercontent.com';
var GOOGLE_CONSUMER_SECRET = 'hMcJZNWysmQhGTtZdIWFRYdA';

var TWITTER_CONSUMER_KEY = 'xofNk7P2ZUFtf6kVscrZSCfxd';
var TWITTER_CONSUMER_SECRET = 'FpUNh5KCx44XZDOjCIWqT4hQmve9Nw6bgn8YY4wfz363tvmZ7Q';


//initialize app
var app = express();
//initialize app ends
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//public directory
app.use(express.static(path.join(__dirname, 'public')));

//routes
var classRoom = require('./routes/class-room');
var auth = require('./routes/auth');
var student = require('./routes/student');
var attendance = require('./routes/attendance');
var routes = require('./routes/index');
//routes end

//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
        clientID: GOOGLE_CONSUMER_KEY,
        clientSecret: GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://192.168.1.4:8080/auth/google/callback"
    },
    function(token, tokenSecret, profile, done) {
        if (!profile.provider) profile.provider = 'google';
        process.nextTick(function() {
            return done(null, profile);
        });
    }
));

passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: "http://192.168.1.4:8080/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        process.nextTick(function() {
            if (!profile.provider) profile.provider = 'twitter';
            return done(null, profile);
        });
    }
));

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    profileFields: ['id', 'displayName', 'photos', 'email', 'name'],
    callbackURL: 'http://192.168.1.4:8080/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        if (!profile.provider) profile.provider = 'facebook';
        done(null, profile);
    });
}));

passport.serializeUser(function(user, done) {

    if (!user)
        throw new Error('invalid user, login failed!');

    var dbUser = {};

    if (user.provider === 'twitter') {
        dbUser = {
            Id: user.id,
            DisplayName: user.displayName,
            Email: null,
            ProfilePicUrl: user.photos[0].value,
            Provider: user.provider
        };
    } else
        dbUser = {
            Id: user.id,
            DisplayName: user.displayName,
            Email: user.emails[0].value,
            ProfilePicUrl: user.photos[0].value,
            Provider: user.provider
        };

    userAccountProvider.saveUser(dbUser, function(err, response) {
        if (err) throw new Error(err);
        else if (!response) throw new Error('user not found!');
        else {
            done(null, response._id);
        }
    });
});

passport.deserializeUser(function(id, done) {
    userAccountProvider.getUser(id, function(err, dbUser) {
        if (err) throw new Error(err);
        else if (!dbUser) throw new Error('user not found!');
        done(null, {
            Id: dbUser._id,
            DisplayName: dbUser.Strategy.Info.DisplayName,
            Email: dbUser.Strategy.Info.Email,
            ProfilePicUrl: dbUser.Strategy.Info.ProfilePicUrl,
            Provider: dbUser.Strategy.Info.Provider
        });
    });
});
//required packeges end

//db manager
var db = require('./provider/db-initializer');
//db manager ends

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

//routes    
app.use('/class-room', classRoom);
app.use('/auth', auth);
app.use('/student', student);
app.use('/attendance', attendance);
app.use('/', routes);
//routes end

//coockie parser
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});
// }

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: err
    });
});

//create server

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app is listening to http://%s:%s', host, port);
    db.connect(function() {
        console.log('database connected');
    })
});

module.exports = app;

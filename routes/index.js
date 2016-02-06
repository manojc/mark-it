var express = require('express');
var router = express.Router();
var appConfig = require('dotenv').config();
var swig = require('swig');

/* GET home page. */
router.get('/', function(req, res) {
    res.send(swig.renderFile('./public/pages/home.html', {
            IsDevEnvironment: process.env.ENV === 'DEV'
        }));

});

/* GET home page. */
router.get('/success', function(req, res) {
    res.json({
        response: 'success!!'
    });
});

/* GET home page. */
router.get('/is-authenticated', function(req, res) {
    res.json({
        isAuthenticated: req.isAuthenticated()
    });
});

/* GET home page. */
router.get('/get-logged-in-user', function(req, res) {

    if (!req.user || !req.isAuthenticated())
        res.json({});

    else if (req.user && req.user.Provider === 'twitter') {
        res.json({
            Id: req.user.Id,
            DisplayName: req.user.DisplayName,
            Email: null,
            ProfilePicUrl: req.user.ProfilePicUrl
        });
    } else
        res.json({
            Id: req.user.Id,
            DisplayName: req.user.DisplayName,
            Email: req.user.Email,
            ProfilePicUrl: req.user.ProfilePicUrl
        });
});

/* GET home page. */
router.get('/error', function(req, res) {
    res.json('<h1>user session expired!!</h1>');
});

/* GET home page. */
router.get('*', function(req, res) {
    res.sendFile('page-not-found.html', {
        root: './public/pages'
    });
});
module.exports = router;

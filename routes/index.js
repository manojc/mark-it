var express = require('express');
var router = express.Router();
var authenticateRoute = require('../utility/authenticate-request');

/* GET home page. */
router.get('/', function(req, res) {

    if (req.isAuthenticated())
        res.sendFile('logged-in-home.html', {
            root: './public'
        });
    else
        res.sendFile('home.html', {
            root: './public'
        });
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
    else
        res.json({
            id: req.user.id,
            firstName: req.user.displayName,
            email: req.user.emails[0].value,
            profilePicUrl: req.user.photos[0].value
        });
});

/* GET home page. */
router.get('/error', function(req, res) {
    res.json('<h1>user session expired!!</h1>');
});

/* GET home page. */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/* GET home page. */
router.get('*', function(req, res) {
    res.sendFile('page-not-found.html', {
        root: './public'
    });
});
module.exports = router;

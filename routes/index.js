var express = require('express');
var router = express.Router();

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

    else if (req.user && req.user.provider === 'twitter') {
        res.json({
            id: req.user.id,
            displayName: req.user.displayName,
            email: null,
            profilePicUrl: req.user.profilePicUrl
        });
    } else
        res.json({
            id: req.user.id,
            displayName: req.user.displayName,
            email: req.user.email,
            profilePicUrl: req.user.profilePicUrl
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

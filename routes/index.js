var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
        console.log(req.user);
        res.render('logged-in-user-home', {
            DisplayName: req.user.DisplayName
        });
    } else
        res.render('home', {});
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

    console.log(req.user);

    if (!req.user || !req.isAuthenticated())
        res.json({});

    else if (req.user && req.user.provider === 'twitter') {
        res.json({
            Id: req.user.id,
            DisplayName: req.user.displayName,
            Email: null,
            ProfilePicUrl: req.user.profilePicUrl
        });
    } else
        res.json({
            Id: req.user.id,
            DisplayName: req.user.displayName,
            Email: req.user.email,
            ProfilePicUrl: req.user.profilePicUrl
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

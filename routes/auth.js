var express = require('express');
var passport = require('passport');
var router = express.Router();

//facebook authentication
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/home'
    }),
    function(req, res) {
        res.redirect('/');
    });
//facebook authentication ends

//google authentication
router.get('/google', passport.authenticate('google', {
    scope: ['email']
}));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/home'
    }),
    function(req, res) {
        res.redirect('/');
    });
//google authentication ends



//twitter authentication
router.get('/twitter', passport.authenticate('twitter', {
    scope: ['email']
}));

router.get('/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/home'
    }),
    function(req, res) {
        res.redirect('/');
    });
//twitter authentication ends

module.exports = router;

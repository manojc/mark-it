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

module.exports = router;

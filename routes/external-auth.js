var express = require('express');
var passport = require('passport');
var router = express.Router();

//facebook authentication
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        console.log('external fb callback');
        console.log(req.user);
        res.redirect('/auth/facebook/callback');
    });
//facebook authentication ends

module.exports = router;

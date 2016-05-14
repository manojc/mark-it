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

/* GET home page. */
router.get('/is-authenticated', function(req, res) {
    res.json({
        IsAuthenticated: req.isAuthenticated()
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/* GET home page. */
router.get('/get-logged-in-user', function(req, res) {


        // res.json({
        //     Status: 'Success',
        //     Message: 'logged in user fetched successfully',
        //     Data: {
        //         Id: 12312312,
        //         DisplayName: 'manoj chalode',
        //         Email: 'chalodem@gmail.com',
        //         ProfilePicUrl: '#',
        //         Provider: 'facebook',
        //         IsNew: true
        //     }
        // });


    if (!req.user || !req.isAuthenticated())
        res.redirect('/');

    else if (req.user && req.user.Provider === 'twitter') {
        res.json({
            Status: 'Success',
            Message: 'logged in user fetched successfully',
            Data: req.user
        });
    } else
        res.json({
            Status: 'Success',
            Message: 'logged in user fetched successfully',
            Data: req.user
        });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/facebook', function(req, res) {
    console.log('internal fb');
    res.redirect('/external-auth/facebook');
});

/* GET home page. */
router.get('/facebook/callback', function(req, res) {
    console.log('internal fb callback');
    console.log(req.user);
    res.json(req.user);
});

module.exports = router;

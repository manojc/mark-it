var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile('home.html', {
        root: './public'
    });
});

/* GET home page. */
router.get('/success', function(req, res) {
    res.json({response:response});
});

/* GET home page. */
router.get('/error', function(req, res) {
    res.json({response:response});
});

/* GET home page. */
router.get('*', function(req, res) {
    res.sendFile('page-not-found.html', {
        root: './public'
    });
});

module.exports = router;

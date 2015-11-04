var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile('home.html', {
        root: './public'
    });
});

/* GET home page. */
router.get('*', function(req, res) {
    res.sendFile('page-not-found.html', {
        root: './public'
    });
});

module.exports = router;

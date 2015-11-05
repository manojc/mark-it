var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.json({
        name: 'manoj chalode',
        email: 'chalodem@gmail.com',
        description: 'first user'
    });
});




router.get('/', function(req, res) {
    res.json({
        name: 'manoj chalode',
        email: 'chalodem@gmail.com',
        description: 'first user'
    });
});

module.exports = router;
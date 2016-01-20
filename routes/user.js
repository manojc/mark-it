var express = require('express');
var router = express.Router();
var dbModels = require('../model/db-models');

var loginModel = dbModels.getDbSchema(dbModels.login, 'loginModel', 'user.collection');
var userModel = dbModels.getDbSchema(dbModels.User, 'userModel', 'user.account');

router.get('/all', function(req, res) {
    userModel.find({}, function(err, response) {
        if (err) res.json({
            status: 'failure',
            data: null
        });
        else
            res.json({
                status: 'success',
                data: response
            });
    });
});

router.get('/', function(req, res) {
    if (!req.query.id) res.json({
        status: 'id not found',
        data: null
    });
    else {
        loginModel.find({
            _id: req.query.id
        }, function(err, response) {
            if (err) res.json({
                status: 'failure',
                data: null
            });
            else
                res.json({
                    status: 'success',
                    data: response
                });
        });
    }
});

router.post('/add-user', function(req, res) {

    var newUser = new loginModel({

        FirstName: req.body.FirstName,
        LastName: req.body.LastName

    }).save(function(err, response) {

        if (err) response.message = 'registration failed';

        else response.status = 'success';

        res.json(response);
    });
});

module.exports = router;

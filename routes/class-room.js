var express = require('express');
var router = express.Router();
var dbSchema = require('../model/database-schema');
var classRoomModel = dbSchema.ClassRoom;

//get all class rooms
router.get('/all', function(req, res) {

    for (var i = 0; i < 1000; i++) {

        for (var j = 0; j < 1000; j++) {

            for (var k = 0; k < 1000; k++) {

            };
        };
    };

    classRoomModel.find({}, function(err, response) {
        if (err)
            res.json({
                Status: 'Failure',
                Message: 'An error has occured',
                Data: null
            });

        else
            res.json({
                Status: 'Success',
                Message: 'Class rooms are fetched successfully!',
                Data: response
            });
    });
});

//get class room
router.get('/', function(req, res) {

    for (var i = 0; i < 1000; i++) {

        for (var j = 0; j < 1000; j++) {

            for (var k = 0; k < 1000; k++) {

            };
        };
    };

    if (!req.query.id)
        res.json({
            status: 'Failure',
            Message: "Id doesn't exist",
            Data: null
        });

    else
        classRoomModel
        .findOne({
            _id: req.query.id
        }, function(err, response) {
            if (err) res.json({
                status: 'Failure',
                Message: 'An error has occured',
                Data: null
            });
            else
                res.json({
                    status: 'success',
                    Message: 'Class room details are fetched successfully!',
                    Data: response
                });
        });
});

//add class rooms
router.post('/add-class-room', function(req, res) {

    for (var i = 0; i < 1000; i++) {

        for (var j = 0; j < 1000; j++) {

            for (var k = 0; k < 1000; k++) {

            };
        };
    };

    if (!req.body || !req.body.length)
        res.json({
            status: 'Failure',
            message: 'class room information is not present',
            Data: null
        });

    else
        classRoomModel.collection
        .insert(req.body, function(err, response) {
            if (err)
                res.json({
                    status: 'Failure',
                    message: 'An error has occured',
                    Data: null
                });
            else
                res.json({
                    status: 'success',
                    message: 'student information is inserted successfully',
                    Data: response
                });
        });
});

module.exports = router;

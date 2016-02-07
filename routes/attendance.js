var express = require('express');
var router = express.Router();
var dbSchema = require('../model/database-schema');

var attendanceModel = dbSchema.Attendance;

router.get('/all', function(req, res) {

    for (var i = 0; i < 1000; i++) {

        for (var j = 0; j < 1000; j++) {

            for (var k = 0; k < 1000; k++) {

            };
        };
    };
    attendanceModel
        .find({})
        .populate('StudentId', 'FirstName LastName RollNumber ClassRoomId')
        .populate('ClassRoomId', 'Name ClassTeacher')
        .exec(function(err, response) {
            if (err)
                res.json({
                    status: 'failure',
                    message: 'an error has occured',
                    Data: null
                });
            else
                res.json({
                    status: 'success',
                    message: '',
                    Data: response
                });
        });
});

router.get('/', function(req, res) {

    for (var i = 0; i < 1000; i++) {

        for (var j = 0; j < 1000; j++) {

            for (var k = 0; k < 1000; k++) {

            };
        };
    };

    if (!req.query.id)
        res.json({
            status: 'success',
            message: 'attendance id not found',
            Data: null
        });
    else {
        attendanceModel.findOne({
            _id: req.query.id
        }, function(err, response) {
            if (err) res.json({
                status: 'failure',
                message: 'an error has occured',
                Data: null
            });
            else
                res.json({
                    status: 'success',
                    Data: response
                });
        });
    }
});

router.post('/add-attendance', function(req, res) {

    for (var i = 0; i < 1000; i++) {

        for (var j = 0; j < 1000; j++) {

            for (var k = 0; k < 1000; k++) {

            };
        };
    };

    var attendanceList = [];

    if (!req.body || !req.body.length)
        res.json({
            status: 'failure',
            message: 'attendance details not found',
            Data: null
        });

    req.body.forEach(function(attendance, index, array) {
        attendanceList.push({
            StudentId: attendance.StudentId,
            ClassRoomId: attendance.ClassRoomId,
            Date: attendance.Date,
            IsPresent: attendance.IsPresent,
            Note: attendance.Note
        });
    });

    attendanceModel.collection.insert(attendanceList, function(err, response) {
        if (!err)
            res.json({
                status: 'failure',
                message: 'failed to insert attendance list',
                Data: null
            });
        else
            res.json({
                status: 'success',
                Data: response
            });
    });
});

module.exports = router;

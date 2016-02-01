var express = require('express');
var router = express.Router();
var dbSchema = require('../model/database-schema');

var attendanceModel = dbSchema.Attendance;

router.get('/all', function(req, res) {
    attendanceModel
        .find({})
        .populate('StudentId', 'FirstName LastName RollNumber')
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

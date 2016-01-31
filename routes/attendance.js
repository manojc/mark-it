var express = require('express');
var router = express.Router();
var dbModels = require('../model/db-models');

var attendanceModel = dbModels.getDbSchema(dbModels.Attendance, 'attendanceModel', 'attendance');

router.get('/all', function(req, res) {
    attendanceModel.find({}, function(err, response) {
        if (err) res.json({
            status: 'failure',
            message: 'an error has occured',
            data: null
        });
        else
            res.json({
                status: 'success',
                message: '',
                data: response
            });
    });
});

router.get('/', function(req, res) {
    if (!req.query.id)
        res.json({
            status: 'success',
            message: 'attendance id not found',
            data: null
        });
    else {
        attendanceModel.findOne({
            _id: req.query.id
        }, function(err, response) {
            if (err) res.json({
                status: 'failure',
                message: 'an error has occured',
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

router.post('/add-attendance', function(req, res) {
    var attendanceList = [];

    if (!req.body || !req.body.length)
        res.json({
            status: 'failure',
            message: 'attendance details not found',
            data: null
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
                data: null
            });
        else
            res.json({
                status: 'success',
                data: response
            });
    });
});

module.exports = router;

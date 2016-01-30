var express = require('express');
var router = express.Router();
var dbModels = require('../model/db-models');

var attendanceModel = dbModels.getDbSchema(dbModels.Attendance, 'attendanceModel', 'attendance');

router.get('/all', function(req, res) {
    attendanceModel.find({}, function(err, response) {
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
        attendanceModel.findOne({
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

router.post('/add-attendance', function(req, res) {
    var attendanceList = [];

    JSON.parse(req.body.attendanceList).forEach(function(attendance, index, array) {
        attendanceList.push({
            StudentId: attendance.StudentId,
            Date: attendance.Date,
            IsPresent: attendance.IsPresent,
            Note: attendance.Note
        });
    });

    attendanceModel.collection.insert(attendanceList, function(err, response) {
        if (!err)
            res.json(response);
        else
            res.json({});
    });
});

module.exports = router;
